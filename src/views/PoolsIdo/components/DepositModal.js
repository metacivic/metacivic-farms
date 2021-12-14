import React, { useMemo, useState, useCallback } from 'react'

import { getFullDisplayBalance } from '../../../utils/formatBalance'
import Input from '../../../components/InputV2/index'
import Modal from '../../../components/Modal/index'
import Button from '../../../components/ButtonV2/index'

import '../../../components/StakeInPoolModal/index.less'

const DepositModal = (props) => {
  const [val, setVal] = useState('0')
	const [pendingTx, setPendingTx] = useState(false)
  const { onConfirm, onDismiss, max, stakingToken , isPool = false} = props

  const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const handleChange = useCallback(
		(e) => {
			setVal(e.currentTarget.value)
		},
		[setVal],
	)

	const handleSelectMax = useCallback(() => {
		setVal(fullBalance)
	}, [fullBalance, setVal])

	const handleConfirm = useCallback(async () => {
		try {
			setPendingTx(true)
			await onConfirm(val)
			setPendingTx(false)
			onDismiss()
		} catch (e) {
			console.log(e)
			setPendingTx(false)
		}
	}, [onConfirm, onDismiss, val])

  return (
    <Modal>
      <div
        className='bsc-stake_in_pool-modal'
      >
        <div
          className='bsc-stake_in_pool-modal-header'
        >
          <span>Stake in pool</span>
          <span>{`Stake ${stakingToken.symbol}`}</span>
        </div>
        <div
          className='bsc-stake_in_pool-modal-content'
        >
          <div
            className='bsc-stake_in_pool-modal-content-top'
          >
            <span>{getFullDisplayBalance(max, stakingToken.decimals)}</span>
            <span>{`${stakingToken.symbol} Available`}</span>
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
                  <span>{stakingToken.symbol}</span>
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
            className='bsc-stake_in_pool-modal-content-bottom mb-4'
          >
            <Button
              text='Confirm'
              primary
              loading={pendingTx}
					    disabled={pendingTx}
              click={handleConfirm}
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