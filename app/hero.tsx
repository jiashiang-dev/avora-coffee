import { CinematicPour } from './cinematic-pour';
import { publicAsset } from './asset-path';

export function Hero() {
  return <CinematicPour videoSrc={publicAsset('/avora-coffee-scrub.mp4')} />;
}
