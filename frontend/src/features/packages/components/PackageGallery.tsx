import Image from 'next/image';
import type { ImageAsset } from '@/types/api';

export function PackageGallery({ images }: { images: readonly ImageAsset[] }) {
  if (images.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {images.slice(0, 4).map((image) => (
        <li key={image.url} className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 15vw, (min-width: 640px) 25vw, 50vw"
            className="object-cover transition duration-500 hover:scale-105"
          />
        </li>
      ))}
    </ul>
  );
}
