import { FooterItem } from './index.d'

const config: FooterItem[] = [
  {
    id: '1',
    title: 'About',
    items: [
      {
        title: 'Docs',
        href: '#',
      },
      {
        title: 'Team',
        href: '#',
      },
      {
        title: 'Roadmap',
        href: '#',
      },
      {
        title: 'Github',
        href: '#',
      },
    ],
  },
  {
    id: '2',
    title: 'Product',
    items: [
      {
        title: 'Exchange',
        href: '/swap',
      },
      {
        title: 'Add liquidity',
        href: '/pool',
      },
      {
        title: 'Start Pools',
        href: 'https://farms.metacivic.io/#/',
      },
      {
        title: 'Farms',
        href: 'https://farms.metacivic.io/#/Farms',
      },
      {
        title: 'NFT',
        href: '/NFTmarket',
      },
    ],
  },
  {
    id: '3',
    title: 'Developer',
    items: [
      {
        title: 'GameFi',
        href: '#',
      },
      {
        title: 'Metaverse',
        href: '#',
      },
    ],
  },
]

export default config


