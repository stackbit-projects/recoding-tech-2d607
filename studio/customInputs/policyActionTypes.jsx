import { Card, Autocomplete } from '@sanity/ui'

const CustomAutocomplete = () => {
    return <Card padding={4} paddingBottom={[7, 7, 8]}>
        <Autocomplete
            fontSize={[2, 2, 3]}
            // icon={SearchIcon}
            id="autocomplete-example"
            options={[
                { value: 'foo' },
                { value: 'bar' },
                { value: 'baz' },
            ]}
            placeholder="Search options"
        />
    </Card>
}

export default CustomAutocomplete