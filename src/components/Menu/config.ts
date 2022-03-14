import { TMenuItem } from './index.d'

import { ReactComponent as HomeIcon } from '../../assets/images/menu/home.svg'
import { ReactComponent as TradeIcon } from '../../assets/images/menu/trade.svg'
import { ReactComponent as NftIcon } from '../../assets/images/menu/nft.svg'
import { ReactComponent as FarmingIcon } from '../../assets/images/menu/farming.svg'
import { ReactComponent as PoolsIDO } from '../../assets/images/menu/idopools.svg'
import { ReactComponent as StakingIcon } from '../../assets/images/menu/staking.svg'
import { ReactComponent as LaunchpadIcon } from '../../assets/images/menu/launchpad.svg'
import { ReactComponent as LuckylottIcon } from '../../assets/images/menu/luckylott.svg'
import { ReactComponent as LuckyspinIcon } from '../../assets/images/menu/luckyspin.svg'
import { ReactComponent as PredictionIcon } from '../../assets/images/menu/prediction.svg'
import { ReactComponent as MoreIcon } from '../../assets/images/menu/more.svg'

const config: TMenuItem[] = [
  {
    label: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    label: 'Trade',
    icon: TradeIcon,
    items: [
      {
        label: 'Exchange',
        href: '/',
      },
      {
        label: 'Liquidity',
        href: '/',
      },
    ],
  },
  {
    label: 'NFT',
    icon: NftIcon,
    items: [
      {
        label: 'Megamarket',
        href: '/',
      },
      {
        label: 'Genesis Market',
        href: '/',
      },
      {
        label: 'My NFT Artworks',
        href: '/',
      },
      {
        label: 'Mint NFT',
        href: '/',
      },
    ],
  },
  {
    label: 'Farms',
    icon: FarmingIcon,
    href: '/farms',
  },
  {
    label: 'Start Pools',
    icon: StakingIcon,
    href: '/',
  },
  {
    label: 'IDO Pools',
    icon: PoolsIDO,
    href: '/',
  },
  {
    label: 'Launchpad',
    icon: LaunchpadIcon,
    href: '/',
  },
  {
    label: 'Prediction',
    icon: PredictionIcon,
    href: '/',
  },
  {
    label: 'More',
    icon: MoreIcon,
    items: [
      {
        label: 'Github',
        href: 'https://github.com/metacivic',
      },
      {
        label: 'Docs',
        href: '/',
      },
      {
        label: 'Blog',
        href: 'https://medium.com',
      },
     
      
    ],
  },
]

export default config
