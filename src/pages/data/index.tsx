import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { UserData } from '../../types'
import { fetchClient } from '../../helper/fetchClient'
import toast from 'react-hot-toast'

const Data = () => {
    const [userData, setuserData] = useState<UserData[]>([])
    const fetchUsers = async () => {
        const result = await fetchClient({
            method: 'GET',
            url: '/users'
        })
        if (result?.ok) {
            setuserData(await result.json())
            return
        }
        toast.error('Failed fetch users')
    }
    useEffect(() => {
        fetchUsers()
        window.document.title = 'List Users'
    }, [])
    return (
        <Card className='h-[80vh] overflow-y-auto w-full max-w-6xl scroll'>
            <table className="table-auto border-spacing-1 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                    <tr>
                        <th className='px-6 py-3'>No</th>
                        <th className='px-6 py-3'>Username</th>
                        <th className='px-6 py-3'>Email</th>
                        <th className='px-6 py-3'>Phone</th>
                        <th className='px-6 py-3'>Category</th>
                        <th className='px-6 py-3'>Description</th>
                        <th className='px-6 py-3'>Media</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map(user => (
                        <tr className='border-b odd:bg-white even:bg-gray-50 ' key={user.id}>
                            <td className='px-6 py-3'>{user.pkId}</td>
                            <td className='px-6 py-3'>{user.username}</td>
                            <td className='px-6 py-3'>{user.email}</td>
                            <td className='px-6 py-3'>{user.phone}</td>
                            <td className='px-6 py-3'>{user.category}</td>
                            <td className='px-6 py-3'>{user.description}</td>
                            <td className='px-6 py-3'>{user.media && (<img className='cursor-pointer hover:opacity-75' width={100} src={'http://localhost:3001/' + user.media} onClick={() => {
                                window.open('http://localhost:3001/' + user.media, '_blank');
                            }} />)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    )
}

export default Data