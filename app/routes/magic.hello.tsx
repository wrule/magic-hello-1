import { LoaderFunction } from '@remix-run/cloudflare';
import { Jimp, rgbaToInt, loadFont } from 'jimp';
import * as Fonts from '@jimp/plugin-print/fonts';
import dayjs from 'dayjs';

export const loader: LoaderFunction = async () => {
  const image = new Jimp({ width: 72, height: 21, color: rgbaToInt(0, 20, 255, 255) });
  image.print({ font: await loadFont(Fonts.SANS_16_WHITE), x: 3, y: 2, text: dayjs().format('HH:mm:ss') });
  const buffer = await image.getBuffer('image/jpeg');
  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
};
