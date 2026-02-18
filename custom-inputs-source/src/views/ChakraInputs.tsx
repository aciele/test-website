import {
  Input,
  Textarea,
  Checkbox,
  RadioGroup,
  Switch,
  Slider,
  Field,
  Select,
  NumberInput,
  PinInput,
  Heading,
  ChakraProvider,
  defaultSystem,
  createListCollection,
} from '@chakra-ui/react'

const sectionStyle = { marginBottom: '32px' }
const labelStyle: React.CSSProperties = { marginBottom: '8px', fontWeight: 500, color: '#333' }

const selectCollection = createListCollection({
  items: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ],
})

export function ChakraInputs() {
  return (
    <ChakraProvider value={defaultSystem}>
    <div>
      <Heading size="lg" marginBottom="4">Chakra UI Components</Heading>

      {/* Text Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Text Input</h3>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input placeholder="Enter text" />
        </Field.Root>
      </div>

      {/* Number Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Number Input</h3>
        <Field.Root>
          <Field.Label>Quantity</Field.Label>
          <NumberInput.Root defaultValue="5" min={0} max={100}>
            <NumberInput.Control>
              <NumberInput.IncrementTrigger />
              <NumberInput.DecrementTrigger />
            </NumberInput.Control>
            <NumberInput.Input />
          </NumberInput.Root>
        </Field.Root>
      </div>

      {/* Email Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Email Input</h3>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input type="email" placeholder="john@example.com" />
        </Field.Root>
      </div>

      {/* Password Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Password Input</h3>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input type="password" placeholder="Enter password" />
        </Field.Root>
      </div>

      {/* Textarea */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Textarea</h3>
        <Field.Root>
          <Field.Label>Message</Field.Label>
          <Textarea placeholder="Enter long text here..." rows={4} />
        </Field.Root>
      </div>

      {/* Select */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Select</h3>
        <Select.Root collection={selectCollection}>
          <Select.Label>Choose option</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select an option" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {selectCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </div>

      {/* Multi-Select */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Multi-Select</h3>
        <Select.Root collection={selectCollection} multiple>
          <Select.Label>Choose multiple options</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select options" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {selectCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </div>

      {/* Checkbox */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Checkbox</h3>
        <Checkbox.Root defaultChecked>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
        </Checkbox.Root>
        <br />
        <Checkbox.Root>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Subscribe to newsletter</Checkbox.Label>
        </Checkbox.Root>
      </div>

      {/* Radio Group */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Radio Group</h3>
        <RadioGroup.Root defaultValue="a">
          <RadioGroup.Item value="a">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Option A</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="b">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Option B</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="c">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Option C</RadioGroup.ItemText>
          </RadioGroup.Item>
        </RadioGroup.Root>
      </div>

      {/* Switch */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Switch / Toggle</h3>
        <Switch.Root defaultChecked>
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Enabled</Switch.Label>
        </Switch.Root>
        <br />
        <Switch.Root>
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Disabled</Switch.Label>
        </Switch.Root>
      </div>

      {/* Slider */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Slider</h3>
        <Slider.Root defaultValue={[30]} min={0} max={100}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0}>
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
      </div>

      {/* Pin Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Pin Input</h3>
        <PinInput.Root>
          <PinInput.Label>Enter OTP</PinInput.Label>
          <PinInput.Control>
            <PinInput.Input index={0} />
            <PinInput.Input index={1} />
            <PinInput.Input index={2} />
            <PinInput.Input index={3} />
          </PinInput.Control>
        </PinInput.Root>
      </div>
    </div>
    </ChakraProvider>
  )
}
