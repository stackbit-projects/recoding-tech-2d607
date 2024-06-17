import { Card, Autocomplete } from '@sanity/ui'
import { useEffect, useState, useCallback } from 'react'
import { set, unset } from 'sanity'

const URL = `https://3tzzh18d.api.sanity.io/v2023-05-03/data/query/tpp-development?query=*%5B%21%28_id+in+path%28%22drafts.**%22%29%29+%26%26+_type+%3D%3D+%22dropdown_option%22%5D+%7B+entry+%7D
`
export const GovtAutocomplete = (props) => {
    const { onChange, value } = props
    const [govts, setGovts] = useState([])

    useEffect(() => {
        fetch(URL).then((res) => {
            return res.json();
        })
            .then((data) => {
                const govts = []
                if (data.result.length) {
                    data.result.map(opt => {
                        if (opt.entry.type === "actionGovt") {
                            govts.push({ value: opt.entry.value })
                        }
                    })
                }
                setGovts(govts);
            })
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
