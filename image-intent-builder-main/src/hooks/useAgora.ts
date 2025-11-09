import { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = import.meta.env.VITE_AGORA_APP_ID || '';
const TEMP_TOKEN = import.meta.env.VITE_AGORA_TEMP_TOKEN || '';

export function useAgora(channelName: string = 'inventory-voice') {
  const [isJoined, setIsJoined] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<AgoraRTC.IAgoraRTCUser[]>([]);
  const [localAudioTrack, setLocalAudioTrack] = useState<AgoraRTC.ILocalAudioTrack | null>(null);
  const clientRef = useRef<AgoraRTC.IAgoraRTCClient | null>(null);

  useEffect(() => {
    if (!APP_ID) {
      console.warn('Agora APP_ID not configured. Using fallback mode.');
      return;
    }

    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    clientRef.current = client;

    const handleUserPublished = async (user: AgoraRTC.IAgoraRTCUser, mediaType: 'audio' | 'video') => {
      await client.subscribe(user, mediaType);
      if (mediaType === 'audio') {
        user.audioTrack?.play();
        setRemoteUsers(prev => [...prev, user]);
      }
    };

    const handleUserUnpublished = (user: AgoraRTC.IAgoraRTCUser) => {
      setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
    };

    const handleUserJoined = (user: AgoraRTC.IAgoraRTCUser) => {
      setRemoteUsers(prev => [...prev, user]);
    };

    const handleUserLeft = (user: AgoraRTC.IAgoraRTCUser) => {
      setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
    };

    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on('user-joined', handleUserJoined);
    client.on('user-left', handleUserLeft);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
      if (localAudioTrack) {
        localAudioTrack.stop();
        localAudioTrack.close();
      }
      if (clientRef.current) {
        clientRef.current.leave();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const join = async (uid?: string | number) => {
    if (!clientRef.current || !APP_ID) {
      console.warn('Agora not initialized. Using fallback mode.');
      return false;
    }

    try {
      const userId = uid || Math.floor(Math.random() * 100000);
      await clientRef.current.join(APP_ID, channelName, TEMP_TOKEN || null, userId);
      setIsJoined(true);

      // Create and publish local audio track
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await clientRef.current.publish(audioTrack);
      setLocalAudioTrack(audioTrack);
      setIsPublished(true);

      return true;
    } catch (error) {
      console.error('Failed to join Agora channel:', error);
      return false;
    }
  };

  const leave = async () => {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
      setLocalAudioTrack(null);
    }
    if (clientRef.current) {
      await clientRef.current.leave();
      setIsJoined(false);
      setIsPublished(false);
    }
  };

  const mute = async () => {
    if (localAudioTrack) {
      await localAudioTrack.setEnabled(false);
    }
  };

  const unmute = async () => {
    if (localAudioTrack) {
      await localAudioTrack.setEnabled(true);
    }
  };

  return {
    isJoined,
    isPublished,
    remoteUsers,
    join,
    leave,
    mute,
    unmute,
  };
}

