import React from 'react'
import useTestStore from '../store/useTestStore'

export const Home = () => {
    const {loading, setLoading} = useTestStore();
  return (
    <div>
        <p>Home {loading ? 5 : 6}</p>
        <button onClick={()=> setLoading(!loading)}>button</button>

    </div>
  )
}
