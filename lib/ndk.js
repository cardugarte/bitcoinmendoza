import NDK from '@nostr-dev-kit/ndk';

const explicitRelays = [
  'wss://relay.lawallet.ar',
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.snort.social',
];

const ndk = new NDK({
  explicitRelayUrls: explicitRelays,
});

ndk.connect().then(() => {
  console.log('Conectado a los relays');
});

export default ndk;