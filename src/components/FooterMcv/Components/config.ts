import { FooterItem } from './index.d'

const config: FooterItem[] = [
  {
    id: '1',
    title: 'About',
    items: [
      {
        title: 'Docs',
        href: 'https://docs.metacivic.io/wiki',
      },
      {
        title: 'Team',
        href: '/',
      },
      {
        title: 'Roadmap',
        href: '/',
      },
      
    ],
  },
  {
    id: '2',
    title: 'Product',
    items: [
      
      {
        title: 'Start Pools',
        href: '/',
      },
      {
        title: 'Farms',
        href: '/Farms',
      },
      {
        title: 'NFT Markets',
        href: '/',
      },
    ],
  },
  {
    id: '3',
    title: 'Developer',
    items: [
      {
        title: 'GameFi',
        href: '/',
      },
      {
        title: 'Metaverse',
        href: '/',
      },
    ],
  },
]

export default config


