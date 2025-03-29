'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Swal from 'sweetalert2'
import DataTable from '../../../components/datatable/datatable';
import { FormData } from '@/types/types';
import InputField from '@/components/InputField';

export default function Crud() {
    const t = useTranslations('Form');

    const [form, setForm] = useState<FormData>({ id: 0, title: '', name: '', surname: '',  age: '', occ: '' });
    const [data, setData] = useState<FormData[]>([]);
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) setData(JSON.parse(storedData));
    }, []);

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(data));
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "age" && value && Number(value) < 1) {
            return;
        }
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.surname || !form.title || !form.age || !form.occ) {
            Swal.fire({
                title: t('wtdata'),
                text: t('wdata'),
                icon: "question",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        if (form.id) {
            Swal.fire({
                icon: "success",
                title: t('updates'),
                showConfirmButton: false,
                timer: 1500
            });
            setData(data.map((item) => (item.id === form.id ? form : item)));
        } else {
            Swal.fire({
                icon: "success",
                title: t('success'),
                showConfirmButton: false,
                timer: 1500
            });
            setData([...data, { ...form, id: Date.now() }]);
        }
        setForm({ id: 0, title: '', name: '', surname: '', age: '', occ: '' });
    };

    const handleEdit = (item: FormData) => {
        setForm(item);
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: t('tdata'),
            text: t('dedata'),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t('yes'),
            cancelButtonText: t('can')
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: t('deletedsuccess'),
                    text: t('text'),
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                setData(data.filter((item) => item.id !== id));
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-4  shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">{t('title')}</h1>
            <form onSubmit={handleSubmit} className="space-y-2">
                {/* <div className="grid gap-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">{t('prefix')}</legend>
                        <select
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="select"
                        >
                            <option value="" disabled>{t('select')}</option>
                            <option value={t('mr')}>{t('mr')}</option>
                            <option value={t('mrs')}>{t('mrs')}</option>
                            <option value={t('ms')}>{t('ms')}</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">{t('name')}</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder={t('type')}
                            value={form.name}
                            onChange={handleChange}
                            name="name"
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">{t('surname')}</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder={t('type')}
                            value={form.surname}
                            onChange={handleChange}
                            name="surname"
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">{t('age')}</legend>
                        <input
                            type="number"
                            className="input"
                            placeholder={t('type')}
                            value={form.age}
                            onChange={handleChange}
                            name="age"
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">{t('occ')}</legend>
                        <input
                            type="text"
                            className="input input-bordered dark:bg-gray-800 dark:text-white"
                            placeholder={t('type')}
                            value={form.occ}
                            onChange={handleChange}
                            name="occ"
                        />
                    </fieldset>
                </div> */}

<div className="grid text-2xl gap-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2">
                    <InputField 
                        label={t('prefix')}
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        type="select"
                        options={[t('mr'), t('mrs'), t('ms')]}
                        placeholder={t('select')}
                    />
                    <InputField 
                        label={t('name')}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        placeholder={t('type')}
                    />
                    <InputField 
                        label={t('surname')}
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                        type="text"
                        placeholder={t('type')}
                    />
                    <InputField 
                        label={t('age')}
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        type="number"
                        placeholder={t('type')}
                    />
                    <InputField 
                        label={t('occ')}
                        name="occ"
                        value={form.occ}
                        onChange={handleChange}
                        type="text"
                        placeholder={t('type')}
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    {form.id ? t('update') : t('save')}
                </button>
            </form>

            <DataTable
                data={data}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}
