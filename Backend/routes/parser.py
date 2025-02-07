def parse_crop_predictions(prediction_text):
    crops = []
    crop_sections = prediction_text.split('\n\n')
    
    for section in crop_sections:
        if not section.strip():
            continue
        
        lines = section.split('\n')
        crop_type = lines[0].strip()
        
        crop_details = {
            'type': crop_type,
            'description': {}
        }
        
        for line in lines[1:]:
            line = line.strip()
            
            if line.startswith('- **Common Name**:'):
                crop_details['common_name'] = line.split(':', 1)[1].strip()
            elif line.startswith('- **Hindi Name**:'):
                crop_details['hindi_name'] = line.split(':', 1)[1].strip()
            elif line.startswith('- **Variety**:'):
                crop_details['variety'] = line.split(':', 1)[1].strip()
        
        description_sections = [
            ('soil_climate', 'Optimal Soil & Climate Conditions'),
            ('growth_duration', 'Growth Duration'),
            ('fertilizer_needs', 'Fertilizer & Irrigation Needs'),
            ('economic_value', 'Uses & Economic Value'),
            ('disease_resistance', 'Disease Resistance & Pest Control')
        ]
        
        for key, section_name in description_sections:
            section_pattern = f'**{section_name}**:'
            section_lines = [line for line in lines if section_pattern in line]
            if section_lines:
                crop_details['description'][key] = section_lines[0].split(':', 1)[1].strip()
        
        if crop_details.get('common_name'):
            crops.append(crop_details)
    
    return crops