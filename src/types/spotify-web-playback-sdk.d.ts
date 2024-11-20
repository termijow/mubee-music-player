// spotify-web-playback-sdk.d.ts
declare namespace Spotify {
    interface PlaybackError {
      message: string;
    }
  
    interface ReadyDevice {
      device_id: string;
    }
  
    interface SpotifyPlayerOptions {
      name: string;
      getOAuthToken: (cb: (token: string) => void) => void;
      volume?: number;
    }
  
    interface SpotifyPlayer {
      new (options: SpotifyPlayerOptions): SpotifyPlayer;
      connect(): Promise<boolean>;
      disconnect(): void;
      addListener(event: 'ready', callback: (device: ReadyDevice) => void): void;
      addListener(event: 'not_ready', callback: (device: ReadyDevice) => void): void;
      addListener(event: 'initialization_error', callback: (error: PlaybackError) => void): void;
      addListener(event: 'authentication_error', callback: (error: PlaybackError) => void): void;
      addListener(event: 'account_error', callback: (error: PlaybackError) => void): void;
      addListener(event: 'playback_error', callback: (error: PlaybackError) => void): void;
    }
  
    interface WindowSpotify {
      Player: SpotifyPlayer;
    }
  }
  
  // Extender el objeto Window global
  interface Window {
    Spotify: Spotify.WindowSpotify;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
  