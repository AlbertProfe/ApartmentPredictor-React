import { useState } from 'react';
import { useSchoolService } from '../middleware/school/schoolServiceHooks';
import { useSchoolData } from '../data/SchoolDataContext';

const SchoolCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
        latitude: '',
        longitude: '',
        rating: 3,
        public: true
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const schoolService = useSchoolService();
    const { refetch } = useSchoolData();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (message.text) {
            setMessage({ type: '', text: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'School name is required';
        } else if (formData.name.length > 100) {
            newErrors.name = 'School name must be 100 characters or less';
        }

        if (!formData.type) {
            newErrors.type = 'School type is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        } else if (formData.location.length > 100) {
            newErrors.location = 'Location must be 100 characters or less';
        }

        if (formData.latitude !== '' && formData.latitude !== null) {
            const lat = parseFloat(formData.latitude);
            if (isNaN(lat) || lat < -90 || lat > 90) {
                newErrors.latitude = 'Latitude must be between -90 and 90';
            }
        }

        if (formData.longitude !== '' && formData.longitude !== null) {
            const lng = parseFloat(formData.longitude);
            if (isNaN(lng) || lng < -180 || lng > 180) {
                newErrors.longitude = 'Longitude must be between -180 and 180';
            }
        }

        const rating = parseInt(formData.rating);
        if (isNaN(rating) || rating < 1 || rating > 5) {
            newErrors.rating = 'Rating must be between 1 and 5';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const schoolData = {
                name: formData.name.trim(),
                type: formData.type,
                location: formData.location.trim(),
                latitude: formData.latitude !== '' ? parseFloat(formData.latitude) : null,
                longitude: formData.longitude !== '' ? parseFloat(formData.longitude) : null,
                rating: parseInt(formData.rating),
                public: formData.public
            };

            await schoolService.createSchool(schoolData);

            setMessage({ type: 'success', text: 'School created successfully!' });
            setFormData({
                name: '',
                type: '',
                location: '',
                latitude: '',
                longitude: '',
                rating: 3,
                public: true
            });
            setErrors({});
            refetch();
        } catch (error) {
            console.error('Error creating school:', error);
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || error.message || 'Failed to create school. Please try again.' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Create New School</h2>
            <p>Fill out the form below to add a new school to the system</p>

            {message.text && (
                <div 
                    style={{
                        padding: '12px',
                        marginBottom: '20px',
                        borderRadius: '4px',
                        backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: message.type === 'success' ? '#155724' : '#721c24',
                        border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                    }}
                    role="alert"
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        School Name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Oak High School"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: errors.name ? '1px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    {errors.name && <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.name}</span>}
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        Type <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: errors.type ? '1px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    >
                        <option value="">Select type...</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="religious">Religious</option>
                    </select>
                    {errors.type && <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.type}</span>}
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        Location <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., Downtown, Uptown, West Side"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: errors.location ? '1px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    {errors.location && <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.location}</span>}
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        Latitude (Optional)
                    </label>
                    <input
                        type="number"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="e.g., 40.7128"
                        step="any"
                        min="-90"
                        max="90"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: errors.latitude ? '1px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    {errors.latitude && <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.latitude}</span>}
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        Longitude (Optional)
                    </label>
                    <input
                        type="number"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="e.g., -74.0060"
                        step="any"
                        min="-180"
                        max="180"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: errors.longitude ? '1px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    {errors.longitude && <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.longitude}</span>}
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        Rating <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: errors.rating ? '1px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    {errors.rating && <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.rating}</span>}
                    <small style={{ display: 'block', marginTop: '4px', color: '#6c757d' }}>
                        Enter a rating between 1 and 5
                    </small>
                </div>

                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="public"
                            checked={formData.public}
                            onChange={handleChange}
                        />
                        <span style={{ fontWeight: '500' }}>Public Access</span>
                    </label>
                    <small style={{ display: 'block', marginTop: '4px', marginLeft: '28px', color: '#6c757d' }}>
                        Check if this school is publicly accessible
                    </small>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginTop: '10px'
                    }}
                >
                    {isSubmitting ? 'Creating School...' : 'Create School'}
                </button>
            </form>
        </div>
    );
};

export default SchoolCreate;