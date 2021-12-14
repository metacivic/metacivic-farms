import { useContext } from 'react'
import { Context as FarmsContext, Farm } from '../contexts/Farms'

const useFarm = (pid: string): Farm => {
  const { farms } = useContext(FarmsContext)
  const farm = farms.find((farm) => farm.pid.toString() === pid)
  return farm
}

export default useFarm
