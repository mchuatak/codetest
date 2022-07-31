import React, { useState, useEffect } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm } from '@inertiajs/inertia-react';
import axios from 'axios';

export default function CreateAttendees(props) {
    const [attendees, setAttendees] = useState([]);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        approved: false,
    });

    const onHandleChange = (e) => {
        const target = e.currentTarget;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value;
        setData(target.name, value);
    };
    
    useEffect(() => {
        getAttendeesList();
    }, []);

    const getAttendeesList = async () => {
        await axios.get('/attendees/list').then(function (response) { 
             setAttendees(response.data);
        });
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('attendees.create'), {
            onSuccess: () => {
                getAttendeesList()
                if(props.flash.status !== 'Success'){
                    reset('first_name', 'last_name', 'email', 'approved')
                }
            }
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Attendees</h2>}
        >   
            <Head title="Attendees" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-6 pt-6">
                            {props.flash.message && (
                                <div class={`p-4 text-sm text-${props.flash.status === 'Success' ? "green" : "red"}-700 bg-${props.flash.status === 'Success' ? "green" : "red"}-100 rounded-lg dark:bg-${props.flash.status === 'Success' ? "green" : "red"}-200 dark:text-${props.flash.status === 'Success' ? "green" : "red"}-800`} role="alert">
                                    <svg aria-hidden="true" class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <span class="font-medium">{props.flash.status} alert!</span> {props.flash.message}
                                </div>                        
                            )}                            
                        </div>
                        <form onSubmit={submit} className="p-6 bg-white border-b border-gray-200">
                            <div className='grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4'>
                                <div>
                                    <Label forInput="first_name" value="First Name" />
                                    <Input
                                        type="text"
                                        name="first_name"
                                        value={data.first_name}
                                        className=""
                                        autoComplete="first_name"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label forInput="last_name" value="Last Name" />
                                    <Input
                                        type="text"
                                        name="last_name"
                                        value={data.last_name}
                                        className=""
                                        autoComplete="last_name"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label forInput="email" value="Email" />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className=""
                                        autoComplete="email"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label forInput="approved" value="Approved" />
                                    <Checkbox
                                        type="checkbox"
                                        name="approved"
                                        value={data.approved}
                                        className=""
                                        autoComplete="approved"
                                        handleChange={onHandleChange}
                                    />
                                </div>

                                <div className="items-center flex">
                                    <Button processing={processing}>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div>
                            <table class="w-full table-auto">
                                <thead>
                                    <th class='border px-6 py-4'>First Name</th>
                                    <th class='border px-6 py-4'>Last Name</th>
                                    <th class='border px-6 py-4'>Email</th>
                                    <th class='border px-6 py-4'>Status</th>
                                </thead>
                                <tbody>
                                    {attendees.map(function(attendee) { 
                                        return(
                                            <>
                                                <tr class='text-center'>
                                                    <td class='border px-6 py-4'>{attendee.first_name}</td>
                                                    <td class='border px-6 py-4'>{attendee.last_name}</td>
                                                    <td class='border px-6 py-4'>{attendee.email}</td>
                                                    <td class='border px-6 py-4'>{attendee.approved?'Approved':'Not Approved'}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
        </Authenticated>
    );
}
