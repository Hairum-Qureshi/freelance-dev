import ImageKit from 'imagekit';

export const ImageKitProvider = {
  provide: 'ImageKitProvider',
  useFactory: () => {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGE_KIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
      urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT!,
    });
    return imagekit;
  },
};
