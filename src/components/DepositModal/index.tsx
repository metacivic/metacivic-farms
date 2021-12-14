import React, { useState, useCallback, useMemo } from 'react'

import { getFullDisplayBalance } from '../../utils/formatBalance'

import Input from '../InputV2'
import Modal from '../Modal'
import Button from '../ButtonV2'

import './index.less'

const DepositModal = (props: any) => {
  const { max, onConfirm, onDismiss, tokenName = '' } = props
  const [val, setVal] = useState('0')
	const [pendingTx, setPendingTx] = useState(false)

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
        className='bsc-deposit-modal'
      >
        <div
          className='bsc-deposit-modal-header'
        >
          <span>Unstake in pool</span>
          <span>{`${tokenName} Tokens`}</span>
        </div>
        <div
          className='bsc-deposit-modal-content'
        >
          <div
            className='bsc-deposit-modal-content-top'
          >
            <span>{getFullDisplayBalance(max, tokenName.decimals)}</span>
            <span>{`${tokenName} available`}</span>
          </div>
          <div
            className='bsc-deposit-modal-content-mid'
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
            className='bsc-deposit-modal-content-bottom'
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
      </div>
    </Modal>
  )
}

export default DepositModal