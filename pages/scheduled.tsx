import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import router from 'next/router';
import { Spinner } from 'evergreen-ui';
import useSWR, { useSWRConfig } from 'swr';
import ScheduledMailForm from '../components/MailForm/ScheduledSend/ScheduledMailForm';
import ErrorMessage from '../components/ErrorMessage';
import View from '../components/View';

export default withPageAuthRequired(() => {
    const { mutate } = useSWRConfig()
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const fetcher = (url: string) => fetch(url).then((r) => r.json())
    const { data, error } = useSWR(
        '/api/hoagie/mail/scheduled/user',
        fetcher,
    )

    console.log(data)

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        const queryParams = new URLSearchParams(location.search)

        if (queryParams.has('code')) {
            queryParams.delete('code')
            queryParams.delete('state')
            // TODO: add support for other params to persist using
            // queryParam.toString() or remove the queryParams method
            router.replace('/app', undefined, { shallow: true })
        }
    }, [])

    if (!data) {
        <View>
            <Spinner />
        </View>
    }
    // TODO: Handle error properly.
    if (error) {
        return (
            <View>
                <ErrorMessage text="Some issue occured connecting
                to Hoagie Mail, try again later or contact hoagie@princeton.edu
                if it does not get resolved."
                />
            </View>
        )
    }
    return (
        <View>
            <ScheduledMailForm
                onError={setErrorMessage}
                // onSend={addDigest}
                errorMessage={errorMessage}
                loading={loading}
                userScheduledMail={data}
                // onDelete={deleteDigest}
            />
        </View>
    );
});
