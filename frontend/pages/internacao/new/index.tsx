import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { Button } from 'primereact/button';
import { FrontEndRoutes } from '../../../config/front-end-routes';
import { NOTIFICATION_TYPES, useNotification } from '../../../context/NotificationProvider';
import { useLoading } from '../../../context/LoadingProvider';

export default function NewSale() {
    const [users, setUsers] = useState<any[]>([]);

    const router = useRouter();
    const { setLoading } = useLoading();
    const { addToast } = useNotification();


    return (
        <Layout>
            <div className="p-10">
                <h1 className="text-2xl mb-4">Cadastrar Nova internação</h1>

            </div>
        </Layout>
    );
}
