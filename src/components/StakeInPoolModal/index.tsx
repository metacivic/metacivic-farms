import React, { useMemo, useState, useCallback } from 'react'

import { getFullDisplayBalance } from '../../utils/formatBalance'
import Input from '../InputV2'
import Modal from '../Modal'
import Button from '../ButtonV2'

import './index.less'

const DepositModal = (props: any) => {
  const [val, setVal] = useState('0')
	const [pendingTx, setPendingTx] = useState(false)
  const { onConfirm, onDismiss, max, tokenName = '' , isPool = false} = props
  const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setVal(e.currentTarget.value)
		},
		[setVal],
	)

	const handleSelectMax = useCallback(() => {
		setVal(fullBalance)
	}, [fullBalance, setVal])

  
  return (
    <Modal>
      <div
        className='bsc-stake_in_pool-modal'
      >
        <div
          className='bsc-stake_in_pool-modal-header'
        >
          <span>Stake in pool</span>
          <span>{`Stake ${tokenName}`}</span>
        </div>
        <div
          className='bsc-stake_in_pool-modal-content'
        >
          <div
            className='bsc-stake_in_pool-modal-content-top'
          >
            <span>{getFullDisplayBalance(max, tokenName.decimals)}</span>
            <span>{`${tokenName} Availabl`}e</span>
          </div>
          <div
            className='bsc-stake_in_pool-modal-content-mid'
          >
            <Input
              change={handleChange}
              type='number'
              value={val}
              right={(
                <>
                  <span>{tokenName}</span>
                  <Button
                    text='Max'
                    primary
                    click={handleSelectMax}
                  />
                </>
              )}
            />
          </div>
          <div
            className='bsc-stake_in_pool-modal-content-bottom'
          >
            <Button
              text='Confirm'
              primary
              loading={pendingTx}
					    disabled={pendingTx}
              click={async () => {
                setPendingTx(true)
                await onConfirm(val)
                setPendingTx(false)
                onDismiss()
              }}
            />
            <Button
              text='Cancel'
              ghost
              click={onDismiss}
            />
          </div>
        </div>
				{
					!isPool && (
						<div
							className='bsc-stake_in_pool-modal-footer'
						>
							<Button
								text='Get more MCV'
								link
							/>
						</div>
					)
				}
      </div>
    </Modal>
  )
}

export default DepositModal