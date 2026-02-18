import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Switch from '@mui/material/Switch'
import Slider from '@mui/material/Slider'
import Autocomplete from '@mui/material/Autocomplete'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const sectionStyle = { marginBottom: '32px' }
const labelStyle: React.CSSProperties = { marginBottom: '8px', fontWeight: 500, color: '#333' }

const selectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

const autocompleteOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

export function MuiInputs() {
  return (
    <div>
      <Typography variant="h5" gutterBottom>Material UI Components</Typography>

      {/* Text Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Text Input (TextField)</h3>
        <TextField label="Enter text" variant="outlined" fullWidth />
      </div>

      {/* Number Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Number Input</h3>
        <TextField label="Enter number" type="number" variant="outlined" fullWidth />
      </div>

      {/* Password Input */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Password Input</h3>
        <TextField label="Enter password" type="password" variant="outlined" fullWidth />
      </div>

      {/* Textarea */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Textarea (multiline TextField)</h3>
        <TextField label="Enter long text" multiline rows={4} variant="outlined" fullWidth />
      </div>

      {/* Select */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Select</h3>
        <FormControl fullWidth>
          <InputLabel id="mui-select-label">Choose option</InputLabel>
          <Select labelId="mui-select-label" label="Choose option" defaultValue="">
            {selectOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Multi-Select */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Multi-Select</h3>
        <FormControl fullWidth>
          <InputLabel id="mui-multi-select-label">Choose options</InputLabel>
          <Select labelId="mui-multi-select-label" label="Choose options" multiple defaultValue={[]}>
            {selectOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Checkbox */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Checkbox</h3>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Checked by default" />
        <FormControlLabel control={<Checkbox />} label="Unchecked" />
      </div>

      {/* Checkbox Group */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Checkbox Group</h3>
        <FormControl component="fieldset">
          <FormLabel component="legend">Pick your favorites</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Pizza" />
            <FormControlLabel control={<Checkbox />} label="Burgers" />
            <FormControlLabel control={<Checkbox />} label="Sushi" />
          </FormGroup>
        </FormControl>
      </div>

      {/* Radio Buttons */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Radio Buttons</h3>
        <FormControl>
          <FormLabel>Choose one</FormLabel>
          <RadioGroup defaultValue="a">
            <FormControlLabel value="a" control={<Radio />} label="Option A" />
            <FormControlLabel value="b" control={<Radio />} label="Option B" />
            <FormControlLabel value="c" control={<Radio />} label="Option C" />
          </RadioGroup>
        </FormControl>
      </div>

      {/* Switch */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Switch / Toggle</h3>
        <FormControlLabel control={<Switch defaultChecked />} label="Enabled" />
        <FormControlLabel control={<Switch />} label="Disabled" />
      </div>

      {/* Slider */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Slider</h3>
        <Slider defaultValue={30} aria-label="Slider" valueLabelDisplay="auto" />
      </div>

      {/* Autocomplete */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Autocomplete</h3>
        <Autocomplete
          options={autocompleteOptions}
          renderInput={(params) => <TextField {...params} label="Search fruits" />}
          fullWidth
        />
      </div>

      {/* Rating */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>Rating</h3>
        <Rating defaultValue={3} />
      </div>

      {/* File Upload */}
      <div style={sectionStyle}>
        <h3 style={labelStyle}>File Upload</h3>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden />
        </Button>
      </div>
    </div>
  )
}
