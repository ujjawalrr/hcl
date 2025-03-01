import React, { useEffect, useState } from 'react'
import useUserStore from '../store/useUserStore';
import { Table } from 'antd';
import axios from 'axios'

export const Transactions = () => {
  const { user } = useUserStore();

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const transactionsData = await axios.get(`http://www.localhost:3000/api/transaction/getTransaction/${7634567892}`)
      // const transactions = await axios.get(`http://www.localhost:3000/api/transaction/getTransaction/${user.accountNumber}`)
      setTransactions(transactionsData.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(transactions)

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
      <p className='text-center text-3xl text-gray-700 font-semibold my-5'>Transactions</p>
      <div>
      <Table dataSource={transactions} columns={columns} />
      </div>
    </div>
  )
}
