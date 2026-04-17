# Feature Specification: School Creation Form

**Version**: 6.1.1  
**Feature**: School Creation Form  
**Component**: `src/school/SchoolCreate.jsx`  
**Middleware**: `src/middleware/school`  
**Status**: Specification  
**Created**: 2026-04-17  

---

## Overview

Implement a comprehensive form in `SchoolCreate.jsx` to create new school records with validation, error handling, and integration with the existing school middleware services.

---

## Feature Requirements

### Functional Requirements

#### FR-1: School Creation Form

- **ID**: FR-1.1
- **Description**: Display a form to capture all required school information
- **Priority**: High
- **Fields**:
  - School Name (required, text, max 100 chars)
  - Type (required, dropdown: public/private/religious)
  - Location (required, text, max 100 chars - e.g., "Downtown", "Uptown", "West Side")
  - Latitude (optional, number, decimal)
  - Longitude (optional, number, decimal)
  - Rating (required, number, 1-5 stars)
  - Public (required, boolean, checkbox - indicates if publicly accessible)

#### FR-2: Form Validation

- **ID**: FR-2.1
- **Description**: Client-side validation before submission
- **Priority**: High
- **Rules**:
  - Name must not be empty (max 100 chars)
  - Type must be selected (public/private/religious)
  - Location must not be empty (max 100 chars)
  - Latitude must be valid decimal (-90 to 90) if provided
  - Longitude must be valid decimal (-180 to 180) if provided
  - Rating must be integer between 1 and 5
  - Public field must be boolean (true/false)

#### FR-3: API Integration

- **ID**: FR-3.1
- **Description**: Submit form data using existing middleware
- **Priority**: High
- **Service**: `schoolApiService.createSchool(school)`
- **Hook**: `useSchoolService()`
- **Endpoint**: `ENDPOINTS.school.create`

#### FR-4: Success/Error Handling

- **ID**: FR-4.1
- **Description**: Display feedback on form submission
- **Priority**: High
- **Success**: 
  - Show success message
  - Clear form
  - Redirect to school list or detail view
  - Refresh school data context
- **Error**:
  - Display error message
  - Keep form data intact
  - Highlight problematic fields

#### FR-5: Map Integration

- **ID**: FR-5.1
- **Description**: Assign school location on map with apartments
- **Priority**: Medium
- **Component**: Use existing `SchoolMapView.jsx`
- **Functionality**:
  - Display map for location selection
  - Allow pin placement for school location
  - Show nearby apartments
  - Capture latitude/longitude coordinates

### Non-Functional Requirements

#### NFR-1: User Experience

- Form should be intuitive and easy to use
- Provide clear labels and placeholders
- Show validation errors inline
- Disable submit button during API call
- Show loading indicator during submission

#### NFR-2: Performance

- Form should render in <100ms
- Validation should be instant (<50ms)
- API call should have timeout (30s)

#### NFR-3: Accessibility

- All form fields must have proper labels
- Support keyboard navigation
- ARIA attributes for screen readers
- Proper focus management

---

## Technical Specification

### Component Structure

```jsx
// src/school/SchoolCreate.jsx

import { useState } from 'react';
import { useSchoolService } from '../middleware/school/schoolServiceHooks';
import { useSchoolData } from '../data/SchoolDataContext';
import SchoolMapView from './SchoolMapView.jsx';

const SchoolCreate = () => {
  // State management
  // Form handlers
  // Validation logic
  // API integration
  // Render form
};

export default SchoolCreate;
```

### State Management

```javascript
// Form data state
const [formData, setFormData] = useState({
  name: '',
  type: '',
  location: '',
  latitude: null,
  longitude: null,
  rating: 3,
  public: true
});

// UI state
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);
const [submitError, setSubmitError] = useState(null);
```

### Validation Schema

```javascript
const validationRules = {
  name: {
    required: true,
    maxLength: 100,
    message: 'School name is required (max 100 characters)'
  },
  type: {
    required: true,
    options: ['public', 'private', 'religious'],
    message: 'School type is required (public, private, or religious)'
  },
  location: {
    required: true,
    maxLength: 100,
    message: 'Location is required (max 100 characters)'
  },
  latitude: {
    required: false,
    min: -90,
    max: 90,
    message: 'Latitude must be between -90 and 90'
  },
  longitude: {
    required: false,
    min: -180,
    max: 180,
    message: 'Longitude must be between -180 and 180'
  },
  rating: {
    required: true,
    min: 1,
    max: 5,
    integer: true,
    message: 'Rating must be an integer between 1 and 5'
  },
  public: {
    required: true,
    type: 'boolean',
    message: 'Public field is required (true or false)'
  }
};
```

### API Integration

```javascript
// Using existing middleware
const schoolService = useSchoolService();
const { refetch } = useSchoolData();

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate form
  const validationErrors = validateForm(formData);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsSubmitting(true);
  setSubmitError(null);

  try {
    // Call existing API service
    const newSchool = await schoolService.createSchool(formData);

    // Success handling
    setSubmitSuccess(true);
    setFormData(initialFormState); // Reset form
    refetch(); // Refresh school data context

    // Optional: Redirect or show success message
    // navigate('/schools');

  } catch (error) {
    console.error('Error creating school:', error);
    setSubmitError(error.message || 'Failed to create school');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Form Fields Layout

```jsx
<form onSubmit={handleSubmit}>
  {/* Basic Information Section */}
  <section>
    <h3>Basic Information</h3>

    <FormField
      label="School Name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      error={errors.name}
      placeholder="e.g., Oak High School"
      required
    />

    <FormField
      label="Type"
      name="type"
      type="select"
      value={formData.type}
      onChange={handleChange}
      error={errors.type}
      options={['public', 'private', 'religious']}
      required
    />

    <FormField
      label="Location"
      name="location"
      value={formData.location}
      onChange={handleChange}
      error={errors.location}
      placeholder="e.g., Downtown, Uptown, West Side"
      required
    />

    <FormField
      label="Rating"
      name="rating"
      type="number"
      min="1"
      max="5"
      value={formData.rating}
      onChange={handleChange}
      error={errors.rating}
      required
    />

    <FormField
      label="Public Access"
      name="public"
      type="checkbox"
      checked={formData.public}
      onChange={handleChange}
      error={errors.public}
      helpText="Check if this school is publicly accessible"
    />
  </section>

  {/* Coordinates Section */}
  <section>
    <h3>Geographic Coordinates (Optional)</h3>

    <FormField
      label="Latitude"
      name="latitude"
      type="number"
      step="any"
      min="-90"
      max="90"
      value={formData.latitude || ''}
      onChange={handleChange}
      error={errors.latitude}
      placeholder="e.g., 40.7128"
    />

    <FormField
      label="Longitude"
      name="longitude"
      type="number"
      step="any"
      min="-180"
      max="180"
      value={formData.longitude || ''}
      onChange={handleChange}
      error={errors.longitude}
      placeholder="e.g., -74.0060"
    />

    {/* Map Integration */}
    <SchoolMapView
      onLocationSelect={(lat, lng) => {
        setFormData(prev => ({
          ...prev,
          latitude: lat,
          longitude: lng
        }));
      }}
      initialLocation={formData.latitude && formData.longitude ? 
        { lat: formData.latitude, lng: formData.longitude } : null
      }
    />
  </section>

  {/* Error/Success Messages */}
  {submitError && (
    <div className="error-message" role="alert">
      {submitError}
    </div>
  )}

  {submitSuccess && (
    <div className="success-message" role="alert">
      School created successfully!
    </div>
  )}

  {/* Submit Button */}
  <button 
    type="submit" 
    disabled={isSubmitting}
    className="submit-button"
  >
    {isSubmitting ? 'Creating School...' : 'Create School'}
  </button>
</form>
```

---

## Dependencies

### Files to Create

- `src/components/FormField.jsx` (reusable form field component - optional)
- `src/school/SchoolCreate.test.jsx` (test file)

## Files to Modify

- `src/school/SchoolCreate.jsx` (main implementation)
- `src/school/SchoolMapView.jsx` (integrate for coordinates)
- `README.md` (update with new feature)
- `docs/api.md` (document school creation endpoint)

### Existing Components

- `SchoolMapView.jsx` - Map component for location selection

### Existing Services

- `schoolApiService.js` - API service with `createSchool()` method
- `schoolServiceHooks.jsx` - Hook `useSchoolService()`
- `SchoolDataContext.jsx` - Context with `refetch()` method

### External Libraries

- React (useState, useEffect)
- React Router (useNavigate) - for navigation after creation
- Axios (already configured in schoolApiService)

### New Components to Create (Optional)

- `FormField.jsx` - Reusable form field component
- `FormError.jsx` - Error message component
- `FormSuccess.jsx` - Success message component

---

## User Flow

1. **User navigates to School Create page**
   
   - Form loads with empty fields
   - Map displays default location

2. **User fills out form**
   
   - Types school information
   - Selects school type and grade levels
   - Enters location details
   - Clicks on map to set precise location

3. **User submits form**
   
   - Client-side validation runs
   - If errors: Display inline error messages
   - If valid: Submit button shows loading state

4. **API processes request**
   
   - Loading indicator displayed
   - Submit button disabled

5. **Success scenario**
   
   - Success message displayed
   - Form clears
   - School data context refreshes
   - Optional: Redirect to school list/detail

6. **Error scenario**
   
   - Error message displayed
   - Form data preserved
   - User can correct and resubmit

---

## Error Handling

### Client-Side Errors

- **Empty name**: "School name is required (max 100 characters)"
- **Empty type**: "School type is required (public, private, or religious)"
- **Empty location**: "Location is required (max 100 characters)"
- **Invalid latitude**: "Latitude must be between -90 and 90"
- **Invalid longitude**: "Longitude must be between -180 and 180"
- **Invalid rating**: "Rating must be an integer between 1 and 5"
- **Invalid public field**: "Public field is required (true or false)"

### Server-Side Errors

- **Network error**: "Unable to connect to server. Please check your connection."
- **Validation error**: Display server validation messages
- **Duplicate school**: "A school with this name already exists"
- **Server error**: "An error occurred while creating the school. Please try again."
- **Timeout**: "Request timed out. Please try again."

---

## Testing Requirements

### Unit Tests

- [ ] Form renders correctly
- [ ] Form fields update state on change
- [ ] Validation rules work correctly
- [ ] Error messages display properly
- [ ] Submit button disabled during submission

### Integration Tests

- [ ] Form submits data to API service
- [ ] Success handling works correctly
- [ ] Error handling works correctly
- [ ] School data context refreshes after creation
- [ ] Map integration captures coordinates

### Manual Testing

- [ ] All fields accept valid input
- [ ] All validation rules trigger correctly
- [ ] Form submits successfully with valid data
- [ ] Error messages clear and helpful
- [ ] Loading states display correctly
- [ ] Success message displays
- [ ] Form resets after successful submission
- [ ] Map location selection works
- [ ] Responsive design on mobile/tablet/desktop

---

## Acceptance Criteria

- ✅ Form displays all 7 required fields (name, type, location, latitude, longitude, rating, public)
- ✅ Form validates input before submission (name, type, location required; lat/lng optional)
- ✅ Form uses existing `schoolApiService.createSchool()` method
- ✅ Form integrates with `SchoolMapView` for coordinate selection
- ✅ Rating field accepts values 1-5 only
- ✅ Type dropdown shows public/private/religious options
- ✅ Public checkbox toggles boolean value
- ✅ Latitude/longitude fields validate range (-90 to 90, -180 to 180)
- ✅ Form shows loading state during submission
- ✅ Form displays success message on successful creation
- ✅ Form displays error messages on failure
- ✅ Form clears after successful submission
- ✅ School data context refreshes after creation
- ✅ Form is accessible (keyboard navigation, screen readers)
- ✅ Form is responsive (mobile, tablet, desktop)
- ✅ All validation rules work correctly
- ✅ Test coverage >80%

---

## Future Enhancements

### Phase 2 (v6.2.x)

- Auto-complete for location using geocoding API
- Bulk school import from CSV/JSON
- Drag-and-drop map pin placement for coordinates
- School logo/image upload
- Additional fields: description, contact info, website
- Star rating UI component (instead of number input)

### Phase 3 (v6.3.x)

- Integration with external school databases
- Automatic geocoding (address to lat/lng)
- Parent/student review system
- School comparison features
- Advanced filtering by type, location, rating
- School district boundaries on map

---

## Related Documentation

- API Documentation: `docs/api.md#school-endpoints`
- Component Documentation: `docs/components.md#school-components`
- Middleware Documentation: `src/middleware/school/README.md`
- Data Context Documentation: `src/data/README.md#school-data-context`

---

## Notes

- Ensure form follows existing design system and styling patterns
- Reuse existing form components if available
- Consider extracting form logic into custom hook (`useSchoolForm`)
- Add proper error boundaries around form
- Implement proper cleanup on component unmount
- Consider adding autosave functionality for long forms
- Add confirmation dialog before leaving page with unsaved changes
