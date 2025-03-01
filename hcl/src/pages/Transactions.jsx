import React, { useEffect, useState } from 'react'
import useUserStore from '../store/useUserStore';
import { Table } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Transactions = () => {
  const { user } = useUserStore();
  const navigate = useNavigate()

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const transactionsData = await axios.get(`http://www.localhost:3000/api/transaction/getTransaction/${user.accountNumber}`)
      setTransactions(transactionsData.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user])

  const columns = [
    {
      title: 'Account',
      dataIndex: 'toAccount',
      key: 'toAccount',
    },
    {
      title: 'BIC',
      dataIndex: 'toBIC',
      key: 'toBIC',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Charge',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Time Taken',
      dataIndex: 'timeTaken',
      key: 'timeTaken',
    },
    {
      title: 'Remaining Balance',
      dataIndex: 'remainingBalance',
      key: 'remainingBalance',
    },
    {
      title: 'Path',
      render: (_, record) => (
        record.path.join('>')
      ),
      key: 'path',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <div className='text-center text-3xl text-gray-700 font-semibold my-5 flex flex-col'>
        <span>Transactions</span>
        <button onClick={()=> navigate('/transfer')}>New Transaction</button>
      </div>
      <div>
        <Table dataSource={transactions} columns={columns} />
      </div>
    </div>
  )
}
