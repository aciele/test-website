import {
  Input,
  InputNumber,
  Select,
  Checkbox,
  Radio,
  Switch,
  Slider,
  DatePicker,
  TimePicker,
  Rate,
  ColorPicker,
  Cascader,
  AutoComplete,
  Upload,
  Transfer,
  Button,
  Typography,
} from 'antd'
import type { TransferProps } from 'antd'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'

const { TextArea, Password } = Input
const { Title } = Typography

const sectionStyle = { marginBottom: '32px' }
const labelStyle: React.CSSProperties = { marginBottom: '8px', fontWeight: 500, color: '#333' }

const selectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

const cascaderOptions = [
  {
    value: 'frontend',
    label: 'Frontend',
    children: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
    ],
  },
  {
    value: 'backend',
    label: 'Backend',
    children: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
    ],
  },
]

const autocompleteOptions = [
  { value: 'Apple' },
  { value: 'Banana' },
  { value: 'Cherry' },
  { value: 'Date' },
  { value: 'Elderberry' },
]

const transferData: TransferProps['dataSource'] = [
  { key: '1', title: 'Item 1' },
  { key: '2', title: 'Item 2' },
  { key: '3', title: 'Item 3' },
  { key: '4', title: 'Item 4' },
  { key: '5', title: 'Item 5' },
]

export function AntDesignInputs() {
  const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>(['3'])

  return (
    <div>
      <Title level={4}>Ant Design Components</Title>

      {/* Text Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Text Input</h3>
        <Input placeholder="Enter text" />
      </div>

      {/* Number Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Number Input (InputNumber)</h3>
        <InputNumber placeholder="Enter number" style={{ width: '100%' }} />
      </div>

      {/* Password Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Password Input</h3>
        <Password placeholder="Enter password" />
      </div>

      {/* Textarea */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Textarea</h3>
        <TextArea rows={4} placeholder="Enter long text here..." />
      </div>

      {/* Select */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Select</h3>
        <Select
          placeholder="Choose option"
          options={selectOptions}
          style={{ width: '100%' }}
        />
      </div>

      {/* Multi-Select */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Multi-Select</h3>
        <Select
          mode="multiple"
          placeholder="Choose options"
          options={selectOptions}
          style={{ width: '100%' }}
        />
      </div>

      {/* Checkbox */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Checkbox</h3>
        <Checkbox defaultChecked>Checked by default</Checkbox>
        <br />
        <Checkbox>Unchecked</Checkbox>
      </div>

      {/* Checkbox Group */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Checkbox Group</h3>
        <Checkbox.Group
          options={['Pizza', 'Burgers', 'Sushi']}
          defaultValue={['Pizza']}
        />
      </div>

      {/* Radio Buttons */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Radio Buttons</h3>
        <Radio.Group defaultValue="a">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
          <Radio value="c">Option C</Radio>
        </Radio.Group>
      </div>

      {/* Switch */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Switch / Toggle</h3>
        <Switch defaultChecked /> <span style={{ marginLeft: 8 }}>Enabled</span>
        <br style={{ marginBottom: 8 }} />
        <Switch /> <span style={{ marginLeft: 8 }}>Disabled</span>
      </div>

      {/* Slider */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Slider</h3>
        <Slider defaultValue={30} />
      </div>

      {/* DatePicker */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Date Picker</h3>
        <DatePicker style={{ width: '100%' }} />
      </div>

      {/* TimePicker */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Time Picker</h3>
        <TimePicker style={{ width: '100%' }} />
      </div>

      {/* AutoComplete */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>AutoComplete</h3>
        <AutoComplete
          options={autocompleteOptions}
          placeholder="Search fruits"
          style={{ width: '100%' }}
          filterOption={(inputValue, option) =>
            option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>

      {/* Rate */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Rate (Stars)</h3>
        <Rate defaultValue={3} />
      </div>

      {/* ColorPicker */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Color Picker</h3>
        <ColorPicker defaultValue="#1677ff" />
      </div>

      {/* Cascader */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Cascader</h3>
        <Cascader
          options={cascaderOptions}
          placeholder="Select category"
          style={{ width: '100%' }}
        />
      </div>

      {/* Transfer */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Transfer</h3>
        <Transfer
          dataSource={transferData}
          targetKeys={transferTargetKeys}
          onChange={(newTargetKeys) => setTransferTargetKeys(newTargetKeys as string[])}
          render={(item) => item.title || ''}
        />
      </div>

      {/* File Upload */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>File Upload</h3>
        <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>
    </div>
  )
}
