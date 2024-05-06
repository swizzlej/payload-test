import payload from 'payload'
import { CollectionConfig } from 'payload/types'

const Trainings: CollectionConfig = {
  slug: 'trainings',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true
    },
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'desc',
      type: 'text',
      required: true
    },
    {
      name: 'longDesc',
      type: 'textarea',
      required: true
    },
    {
      name: 'features',
      type: 'array',
      labels: {singular: 'Feature', plural: 'Features'},
      fields: [
        {
          name: 'title',
          type: 'textarea' 
        }
      ]
    },
    {
      name: 'requirements',
      type: 'array',
      labels: {singular: 'Requirement', plural: 'Requirements'},
      fields: [
        {
          name: 'title',
          type: 'textarea',
        }
      ],
      defaultValue: [
        {title: 'Attend and participate in all class sessions.'},
        {title: 'Participate in all course activities.'},
        {title: 'Demonstrate competency in all required skills without any coaching or assistance'},
        {title: 'Successfully complete the written exam.'},
        {title: 'Successfully complete the final skills scenarios.'}
      ]
    },
    {
      name: 'onlineModules',
      type: 'array',
      labels: {singular: 'Online Module', plural: 'Online Modules'},
      fields: [
        {
          name: 'title',
          type: 'text' 
        },
        {
          name: 'details',
          type: 'textarea' 
        },
      ]
    },
    {
      name: 'modules',
      type: 'array',
      labels: {singular: 'In-Person Module', plural: 'In-Person Modules'},
      fields: [
        {
          name: 'title',
          type: 'text'
        },
        {
          name: 'details',
          type: 'textarea',
        },
      ]
    },
    {
      name: 'assessments',
      type: 'array',
      labels: {singular: 'Assessment', plural: 'Assessments'},
      fields: [
        {
          name: 'title',
          type: 'text' 
        },
        {
          name: 'details',
          type: 'textarea' 
        },
      ]
    },
    {
      name: 'audiences',
      type: 'array',
      labels: {singular: 'Audience', plural: 'Audiences'},
      fields: [
        {
          name: 'title',
          type: 'text' 
        },
        {
          name: 'details',
          type: 'textarea' 
        },
      ]
    },
    {
      name: 'prices',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'partner',
          type: 'json',
        }
      ],
      defaultValue: [
        {
          partner: {
            "shortName": "NSC",
            "fullName": "National Safety Council",
            "price": 80
          }
        },
        {
          partner: {
            "shortName": "ECSI",
            "fullName": "Emergency Care and Safety Institute",
            "price": 50
          }
        },
        {
          partner: {
            "shortName": "ARC",
            "fullName": "American Redcross",
            "price": 80
          }
        }
      ]
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'registrations',
      type: 'relationship',
      relationTo: 'registrations',
      hasMany: true,
    }
  ],
  
}

export default Trainings
