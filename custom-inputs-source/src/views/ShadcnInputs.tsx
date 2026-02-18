import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const sectionStyle = { marginBottom: '32px' }
const labelStyle: React.CSSProperties = { marginBottom: '8px', fontWeight: 500, color: '#333' }

export function ShadcnInputs() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">shadcn/ui Components</h2>

      {/* Text Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Text Input</h3>
        <Label htmlFor="shadcn-text">Name</Label>
        <Input id="shadcn-text" type="text" placeholder="Enter text" />
      </div>

      {/* Number Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Number Input</h3>
        <Label htmlFor="shadcn-number">Quantity</Label>
        <Input id="shadcn-number" type="number" placeholder="Enter number" />
      </div>

      {/* Email Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Email Input</h3>
        <Label htmlFor="shadcn-email">Email</Label>
        <Input id="shadcn-email" type="email" placeholder="john@example.com" />
      </div>

      {/* Password Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Password Input</h3>
        <Label htmlFor="shadcn-password">Password</Label>
        <Input id="shadcn-password" type="password" placeholder="Enter password" />
      </div>

      {/* Textarea */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Textarea</h3>
        <Label htmlFor="shadcn-textarea">Message</Label>
        <Textarea id="shadcn-textarea" placeholder="Enter long text here..." rows={4} />
      </div>

      {/* Select */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Select</h3>
        <Label>Choose a fruit</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Checkbox */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Checkbox</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="shadcn-check1" defaultChecked />
          <Label htmlFor="shadcn-check1">Accept terms and conditions</Label>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox id="shadcn-check2" />
          <Label htmlFor="shadcn-check2">Subscribe to newsletter</Label>
        </div>
      </div>

      {/* Radio Group */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Radio Group</h3>
        <RadioGroup defaultValue="option-a">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-a" id="shadcn-r1" />
            <Label htmlFor="shadcn-r1">Option A</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-b" id="shadcn-r2" />
            <Label htmlFor="shadcn-r2">Option B</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-c" id="shadcn-r3" />
            <Label htmlFor="shadcn-r3">Option C</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Switch */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Switch / Toggle</h3>
        <div className="flex items-center space-x-2">
          <Switch id="shadcn-switch1" defaultChecked />
          <Label htmlFor="shadcn-switch1">Enabled</Label>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Switch id="shadcn-switch2" />
          <Label htmlFor="shadcn-switch2">Disabled</Label>
        </div>
      </div>

      {/* Slider */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Slider</h3>
        <Label>Volume</Label>
        <Slider defaultValue={[30]} max={100} step={1} className="mt-2" />
      </div>
    </div>
  )
}
