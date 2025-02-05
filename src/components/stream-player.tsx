import { useCopyToClipboard } from "@/lib/clipboard";
import {
  AudioTrack,
  StartAudio,
  VideoTrack,
  useLocalParticipant,
  useMediaDeviceSelect,
  useRoomContext,
  useTracks,
} from "@dtelecom/components-react";
import { CopyIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Button, Flex, Grid, Text } from "@radix-ui/themes";
import {
  ConnectionState,
  LocalVideoTrack,
  Track,
  createLocalTracks,
} from "@dtelecom/livekit-client";
import { useEffect, useRef, useState } from "react";
import { MediaDeviceSettings } from "./media-device-settings";

export function StreamPlayer({ isHost = false }) {
  const [_, copy] = useCopyToClipboard();

  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack>();
  const localVideoEl = useRef<HTMLVideoElement>(null);

  const { name: roomName, state: roomState } = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const canHost = isHost;

  useEffect(() => {
    if (canHost) {
      const createTracks = async () => {
        const tracks = await createLocalTracks({ audio: true, video: true });
        const camTrack = tracks.find((t) => t.kind === Track.Kind.Video);
        if (camTrack && localVideoEl?.current) {
          camTrack.attach(localVideoEl.current);
        }
        setLocalVideoTrack(camTrack as LocalVideoTrack);
      };
      void createTracks();
    }
  }, [canHost]);

  const { activeDeviceId: activeCameraDeviceId } = useMediaDeviceSelect({
    kind: "videoinput",
  });

  useEffect(() => {
    if (localVideoTrack) {
      void localVideoTrack.setDeviceId(activeCameraDeviceId);
    }
  }, [localVideoTrack, activeCameraDeviceId]);

  const remoteVideoTracks = useTracks([Track.Source.Camera]).filter(
    (t) => {return t.participant.identity !== localParticipant.identity}
  );

  const remoteAudioTracks = useTracks([Track.Source.Microphone]).filter(
    (t) => {return t.participant.identity !== localParticipant.identity}
  );

  return (
    <div className="relative h-full w-full bg-black">
      <Grid className="w-full h-full absolute" gap="2">
        {canHost ?  (
          <div className="relative">
            <Flex
              className="absolute w-full h-full"
              align="center"
              justify="center"
            >
              <Avatar
                size="9"
                fallback={localParticipant.identity[0] ?? "?"}
                radius="full"
              />
            </Flex>
            <video
              ref={localVideoEl}
              className="absolute w-full h-full object-contain -scale-x-100 bg-transparent"
            />
            <div className="absolute w-full h-full">
              <Badge
                variant="outline"
                color="gray"
                className="absolute bottom-2 right-2"
              >
                {localParticipant.identity} (you)
              </Badge>
            </div>
          </div>
        ) : (
        <>
            {remoteVideoTracks.map((t) => (
              <div key={t.participant.identity} className="relative">
                <Flex
                  className="absolute w-full h-full"
                  align="center"
                  justify="center"
                >
                  <Avatar
                    size="9"
                    fallback={t.participant.identity[0] ?? "?"}
                    radius="full"
                  />
                </Flex>
                <VideoTrack
                  participant={t.participant}
                  source={t.source}
                  publication={t.publication}
                  key={t.participant.identity}
                  className="absolute w-full h-full bg-transparent"
                />
                <div className="absolute w-full h-full">
                  <Badge
                    variant="outline"
                    color="gray"
                    className="absolute bottom-2 right-2"
                  >
                    {t.participant.identity}
                  </Badge>
                </div>
              </div>
            ))}
          {remoteAudioTracks.map((t) => (
            <AudioTrack
              participant={t.participant}
              source={t.source}
              publication={t.publication}
              key={t.participant.identity}
            />
          ))}
          <StartAudio
            label="Click to allow audio playback"
            className="absolute top-0 h-full w-full bg-gray-2-translucent text-white"
          />
        </>
        )}
      </Grid>
      <div className="absolute top-0 w-full p-2">
        <Flex justify="between" align="end">
          <Flex gap="2" justify="center" align="center">
            <Button
              size="1"
              variant="soft"
              disabled={!Boolean(roomName)}
              onClick={() =>
                copy(`${process.env.NEXT_PUBLIC_SITE_URL}/watch/${roomName}`)
              }
            >
              {roomState === ConnectionState.Connected ? (
                <>
                  {roomName} <CopyIcon />
                </>
              ) : (
                "Loading..."
              )}
            </Button>
            {roomName && canHost && (
              <Flex gap="2">
                <MediaDeviceSettings />
              </Flex>
            )}
          </Flex>
          <Flex gap="2">
            {roomState === ConnectionState.Connected && (
              <Flex gap="1" align="center">
                <div className="rounded-6 bg-red-9 w-2 h-2 animate-pulse" />
                <Text size="1" className="uppercase text-accent-11">
                  Live
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
