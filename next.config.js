/** @type {import('next').NextConfig} */
import { i18n } from 'next-i18next';
import path from 'path';
const nextConfig = {
  experimental: {
    appDir: true,
  },
}
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

const localePath = path.resolve('./public/static/locales');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    localePath,
  },
};

module.exports = nextConfig