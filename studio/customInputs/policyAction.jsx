import { Card, Autocomplete } from '@sanity/ui'
import { useEffect, useState, useCallback } from 'react'
import { set, unset } from 'sanity'
import { createClient } from '@sanity/client'

const client = createClient({
    projectId: '3tzzh18d',
    dataset: 'production',
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
})

const query = `*[!(_id in path("drafts.**")) && _type == "dropdown_option"] { entry }`
export const GovtAutocomplete = (props) => {
    const { onChange, value } = props
    const [govts, setGovts] = useState([])

    const fetchGovts = useCallback(async () => {
        const results = await client.fetch(query)
        const govts = []
        if (results.length) {
            results.map(result => {
                if (result.entry.type === 'actionGovt') {
                    govts.push({ value: result.entry.value })
                }
            })
        }
        setGovts(govts)
    }, [])

    useEffect(() => {
        fetchGovts()
    }, [])

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

    const fetchTypes = useCallback(async () => {
        const results = await client.fetch(query)
        const types = []
        if (results.length) {
            results.map(result => {
                if (result.entry.type === 'actionType') {
                    types.push({ value: result.entry.value })
                }
            })
        }
        setTypes(types)
    }, [])

    useEffect(() => {
        fetchTypes()
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
