'use client'

import Button from "@/components/ui/Button";
import PageTitle from "@/components/ui/PageTitle";
import Spinner from "@/components/ui/Spinner";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { FaUser, FaFemale, FaMale } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import Input from "@/components/ui/Input";
import EditModal from "./EditModal";


 export type User = {
    name: string; email: string; gender: string; status: string , id:string

 }

function Users() {

    const [users, setUsers] = useState<User[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [openModal,setOpenModal]= useState< boolean>(false)
    const [userToEdit, setUserToEdit] = useState<User | null>(null)
    

    const PER_PAGE = 10
 

 useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
     try {
      const params = {
        page,
        per_page: PER_PAGE,
        ...(searchQuery ? { name: searchQuery } : {}), 
      };

      const data = await api.getUsers(params);
      setUsers(data);
      } catch (err) {
        console.error("Błąd:", err);
      } finally {
        setIsLoading(false);
       
      }
    };

    fetchData();
  }, [page, searchQuery]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(search)
    setPage(1)
   
  };

  const handleOpenEditModal = (user:User) => {
    setOpenModal(true)
    setUserToEdit(user)
   
  }

  

    return (
      <>
        <section className="w-full max-w-[700px] mx-auto">
                        <PageTitle title="Lista Uzytkowników" />

                        <form className='flex items-start gap-8 justify-between mt-12' onSubmit={onSubmit}>
                            <Input name='search' type="search" onChange={e=>setSearch(e.target.value)}   />
                            <Button type="submit">Szukaj</Button>
                        </form>

                         {isLoading && <div className='flex items-center justify-center h-10 mt-12'><Spinner/></div>}
                            {!isLoading && users && users.length === 0 && <p className='mt-12 text-xl text-center'>Nie znaleziono żadnego użytkownika</p>}

                {       !isLoading && users && users.length > 0 && 
                            <div className='mt-12 sm:max-h-[600px] overflow-y-auto sm:border border-gray-200 rounded-lg sm:px-4 sm:py-2' >
                                 <ul className="divide-y divide-gray-200">
        {users && users.map((user) => (
          <li key={user.id} className="py-2 text-sm flex items-start w-full gap-2 justify-between">
            <div className='flex flex-col gap-1.5   overflow-hidden w-full'>

            <p className='flex items-center gap-1 '><FaUser className='text-pink-400 ml-0.5 size-5 lg:size-4 shrink-0' />  <span className="truncate block w-full">{user.name}</span></p>
            <p className='flex items-center gap-1  w-full'><MdEmail className='text-pink-400 ml-0.5 size-5 lg:size-4 shrink-0' /> <span className="truncate block w-full">{user.email}</span></p>
            <p className='flex items-center gap-1 w-[68px] '>{user.gender === 'female' ? <FaFemale className='text-pink-400 size-5 shrink-0' /> : <FaMale className='text-pink-400 size-5 shrink-0' />} {user.gender}</p>
            </div>
           
            <Button variant='edit' title='Edytuj' aria-label='edytuj' onClick={()=>handleOpenEditModal(user)}><IoMdMore className='pointer-event-none size-5 text-black' /></Button>
          </li>
        ))}
      </ul>
                            </div>}
        </section>
        {openModal && userToEdit  && <EditModal user={userToEdit} closeModal={()=>setOpenModal(false)} setUsers={setUsers} />}
      </>
    )
}

export default Users
