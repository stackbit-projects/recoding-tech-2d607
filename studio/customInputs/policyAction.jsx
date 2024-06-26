import { Card, Autocomplete } from '@sanity/ui'
import { useEffect, useState, useCallback } from 'react'
import { set, unset } from 'sanity'
import { createClient } from '@sanity/client'

const client = createClient({
    // projectId: '3tzzh18d',
    // dataset: 'production',
    // token: 'skCP69cDcKC9OTRmYdiLfKCmywB1XmZS7ZkkXcFxEVa82MkpV9rnp9K8vAuL7uGKi5Na995wyku9v5P4EkJ08ibJtdvl3pZfkBHU4SPzMj48BDAOD7i4PzZh8v9LyqaZbuPCrHAlwna29GyJwQ5HTtMDiCxcGanlTi4EcSb3fspNyb6b4nE6',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    token: process.env.SANITY_STUDIO_ACCESS_TOKEN,
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_STUDIO_ACCESS_TOKEN // Only if you want to update content with the client
})

const query = `*[!(_id in path("drafts.**")) && _type == "dropdown_option"] { entry }`
// const URL = `https://3tzzh18d.api.sanity.io/v2023-05-03/data/query/?query=*%5B%21%28_id+in+path%28%22drafts.**%22%29%29+%26%26+_type+%3D%3D+%22dropdown_option%22%5D+%7B+entry+%7D
// `
export const GovtAutocomplete = (props) => {
    const { onChange, value } = props
    const [govts, setGovts] = useState([])

    const fetchGovts = useCallback(async () => {
        const govts = await client.fetch(query)
        console.log("govts =>", govts)
        setGovts(govts)
    }, [])

    useEffect(() => {
        // fetch(URL).then((res) => {
        //     return res.json();
        // })
        //     .then((data) => {
        //         const govts = []
        //         if (data.result.length) {
        //             data.result.map(opt => {
        //                 if (opt.entry.type === "actionGovt") {
        //                     govts.push({ value: opt.entry.value })
        //                 }
        //             })
        //         }
        //         setGovts(govts);
        //     })
        fetchGovts()
    }, [])

    useEffect(() => {
        console.log("govts =>", govts)
    }, [govts])

    const handleChange = useCallback((event) => {
        const nextValue = event
        onChange(nextValue ? set(event) : unset())
    }, [onChange])

    return <Card paddingBottom={[1, 1, 2]}>
        <Autocomplete
            fontSize={[1, 1, 2]}
            onChange={handleChange}
            id="autocomplete-example"
            options={govts}
            placeholder="Search options"
            value={value}
        />
    </Card>
}

export const TypeAutocomplete = (props) => {
    const { onChange, value } = props
    const [types, setTypes] = useState([])

    useEffect(() => {
        fetch(URL).then((res) => {
            return res.json();
        })
            .then((data) => {
                const govts = []
                if (data.result.length) {
                    data.result.map(opt => {
                        if (opt.entry.type === "actionType") {
                            govts.push({ value: opt.entry.value })
                        }
                    })
                }
                setTypes(govts);
            })
    }, [])

    const handleChange = useCallback((event) => {
        const nextValue = event
        onChange(nextValue ? set(event) : unset())
    }, [onChange])

    return (
        <Card paddingBottom={[1, 1, 2]}>
            <Autocomplete
                fontSize={[1, 1, 2]}
                onChange={handleChange}
                id="autocomplete-example"
                options={types}
                placeholder="Search options"
                value={value}
            />
        </Card>
    )
}
