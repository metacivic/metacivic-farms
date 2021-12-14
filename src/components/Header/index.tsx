import React, { memo, useCallback, useMemo, useState } from 'react'
import { useWallet } from 'use-wallet'

import Button from '../ButtonV2'
import { ReactComponent as CloseIcon } from '../../assets/images/menu/close.svg'
import { ReactComponent as Logo } from '../../assets/images/menu/logo-bscs.svg'
import { ReactComponent as LogoGrey } from '../../assets/images/logo.svg'
import { ReactComponent as OpenIcon } from '../../assets/images/menu/open.svg'
import WalletProviderModal from '../WalletProviderModal/WalletProviderModal'
import AccountModal from '../../components/TopBar/components/AccountModal'
import useModal from '../../hooks/useModal'

import { HeaderBSCProps } from './index.d'
import './index.less'

const Header = memo<HeaderBSCProps>(({ onBack, init }) => {
	const [isOpen, setIsOpen] = useState<boolean>(init)
	const { account } = useWallet()
	const customAccount = useMemo<string>(() => {
		if (account) {
			return `${account.substr(0, 4)}...${account.substr(account.length - 4)}`
		} else {
			return 'Connect Wallet'
		}
	}, [account])
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
	const handleBack = useCallback(async () => {
		if (onBack) {
			setIsOpen(await onBack())
		}
	}, [onBack])
  const [onPresentAccountModal] = useModal(<AccountModal />)
	return (
		<div className="bsc-header">
			<div className="bsc-header-left">
				<Button
					link
					click={handleBack}
					left={isOpen ? <OpenIcon /> : <CloseIcon />}
				/>
				<Logo />
			</div>
			<div className="bsc-header-right">
				{!account ? (
					<Button
						primary
						click={onPresentWalletProviderModal}
						text={customAccount}
					/>
				) : (
					<Button
						primary
						click={onPresentAccountModal}
						text={customAccount}
					/>
				)}

				<LogoGrey />
			</div>
		</div>
	)
})

export default Header
