import { CollectionConfig } from 'payload/types'
import payload from 'payload'
import { text } from 'express'
import { registrationTemplate } from '../emailTemplates/newRegistration'

const Registrations: CollectionConfig = {
  slug: 'registrations',
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true
    },
    {
      name: 'lastName',
      type: 'text',
      required: true
    },
    {
      name: 'email',
      type: 'text',
      required: true
    },
    {
      name: 'training',
      type: 'relationship',
      relationTo: 'trainings',
      required: true,
      
    }
  ],
  hooks: {
    afterChange: [({doc}) => {

      payload.findByID({
        collection: 'trainings', // required
        id: doc.training, // required
        depth: 2,
        locale: 'en',
        overrideAccess: false,
        showHiddenFields: true,
      }).then(
        (trainingRes: any) => {
          payload.sendEmail({
            from: 'noreply@ira-payload-cms.payloadcms.app',
            to: doc.email,
            subject: `Succesfull Registration for ${trainingRes.title}`,
            email: 'You have gotten a new registration',
            html: registrationTemplate(trainingRes.title, 'https://learn.irassociation.org/', `${doc.firstName} ${doc.lastName}`)
          }).then(
            res => {
              console.log('success')
            }, errors => {
              console.log(errors);
              
            }
          );

          payload.sendEmail({
            from: 'noreply@ira-payload-cms.payloadcms.app',
            to: 'support@swizzdigital.com',
            subject: `New Registration for ${trainingRes.title}`,
            email: 'You have gotten a new registration',
            html: registrationTemplate(trainingRes.title, 'https://learn.irassociation.org/', `${doc.firstName} ${doc.lastName}`, true)
          }).then(
            res => {
              console.log('success number 2')
            }, errors => {
              console.log(errors);
              
            }
          )
        }, errors => {
          console.log(errors);
          
        }
      )
      
      
      
    }]
  }
  
}

export default Registrations
