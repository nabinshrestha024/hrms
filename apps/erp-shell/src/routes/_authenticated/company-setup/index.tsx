import { FormRenderer, FormViewConfig } from '@erp/config-engine';
import { useUpdateCompanyProfile } from '@erp/data-access';
import { Button, ContentShell, HRCard, toast } from '@erp/ui';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/company-setup/')({
  component: BasicInformationForm,
  beforeLoad: () => ({ breadcrumb: 'Company Profile' }),
});

export const BasicInformationFormSchema: FormViewConfig = {
  entity: 'company-profile',
  fields: [
    {
      name: 'organizationLegalName',
      type: 'text',
      label: 'Organization Legal Name',
      placeholder: 'Global Square IT Company',
      subLabel: 'legal name is used in invoices and external documents',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'organizationShortName',
      type: 'text',
      label: 'Organization Short Name',
      placeholder: 'Global Square',
      subLabel: 'short name is used in software except in external documents',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'organizationCode',
      type: 'text',
      label: 'Organization Code',
      placeholder: 'e.g. RG for Rigo Technologies (2 to 4 digits)',
      validation: {},
    },
    {
      name: 'organizationVoucherCode',
      type: 'text',
      label: 'Organization Voucher Code',
      validation: {},
    },
    {
      name: 'natureOfOrganization',
      type: 'select',
      label: 'Nature of Organization',
      isRequired: true,
      options: [
        'Private Limited',
        'Public Limited',
        'Partnership',
        'Sole Proprietorship',
        'Non-Profit',
        'Government',
        'Other',
      ],
      validation: { required: true },
    },
    {
      name: 'currency',
      type: 'select',
      label: 'Currency',
      isRequired: true,
      options: ['NPR', 'EUR', 'GBP', 'INR', 'USD'],
      validation: { required: true },
    },
    {
      name: 'panNumber',
      type: 'text',
      label: 'PAN or VAT Number',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'registrationNumber',
      type: 'text',
      label: 'Registration Number',
      isRequired: true,
      validation: { required: true },
    },

    // Address Section
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      isRequired: true,
      options: ['Nepal', 'India', 'United States', 'United Kingdom', 'Germany'],
      validation: { required: true },
    },
    {
      name: 'province',
      type: 'select',
      label: 'Province',
      isRequired: true,
      options: [
        'Bagmati',
        'Gandaki',
        'Lumbini',
        'Karnali',
        'Sudurpashchim',
        'Madhesh',
      ],
      validation: { required: true },
    },
    {
      name: 'district',
      type: 'select',
      label: 'District',
      isRequired: true,
      options: ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Biratnagar'],
      validation: { required: true },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
      placeholder: '986000000',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'hr@company.com',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website',
      placeholder: 'https://globalsquareit.com/',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'taxOffice',
      type: 'select',
      label: 'Tax Office',
      isRequired: false,
      options: ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Biratnagar'],
      validation: { required: false },
    },
  ],

  layout: {
    type: 'section',
    children: [
      {
        type: 'columns',
        columns: 2,
        title: 'Basic information',
        children: [
          { type: 'field', name: 'organizationLegalName' },
          { type: 'field', name: 'organizationShortName' },
          { type: 'field', name: 'organizationCode' },
          { type: 'field', name: 'organizationVoucherCode' },
          { type: 'field', name: 'natureOfOrganization' },
          { type: 'field', name: 'currency' },
          { type: 'field', name: 'panNumber' },
          { type: 'field', name: 'registrationNumber' },
        ],
      },
      {
        type: 'columns',
        columns: 2,
        title: 'Address',
        children: [
          { type: 'field', name: 'country' },
          { type: 'field', name: 'province' },
        ],
      },
      {
        type: 'columns',
        columns: 2,
        children: [{ type: 'field', name: 'district' }],
      },
      {
        type: 'columns',
        columns: 2,
        children: [{ type: 'field', name: 'phoneNumber' }],
      },

      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'email' },
          { type: 'field', name: 'website' },
          { type: 'field', name: 'taxOffice' },
        ],
      },
    ],
  },
};

export function BasicInformationForm() {
  const navigate = useNavigate();
  const updateProfile = useUpdateCompanyProfile();
  const onSubmit = (data: Record<string, unknown>) => {
    updateProfile.mutate(
      {
        organizationLegalName: String(data.organizationLegalName ?? ''),
        organizationShortName: String(data.organizationShortName ?? ''),
        natureOfOrganization: String(data.natureOfOrganization ?? ''),
        currency: String(data.currency ?? ''),
        panNumber: String(data.panNumber ?? ''),
        registrationNumber: String(data.registrationNumber ?? ''),
        taxOffice: String(data.taxOffice ?? ''),
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Company profile saved' });
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to save profile' });
        },
      }
    );
  };

  return (
    <ContentShell
      title="Company Profile"
      className="max-h-[calc(100vh-120px)]"
      titleClassName="px-6 lg:px-12"
    >
      <div className="flex flex-col gap-1">
        <div className="flex-1 p-3 lg:px-6 ">
          <HRCard
            cardClassName="p-3 lg:p-6 border-none rounded-t-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
            cardContentClassName="p-0"
          >
            <FormRenderer
              config={BasicInformationFormSchema}
              onSubmit={onSubmit}
              submitLabel="Save Changes"
              isDialogForm={false}
            />
          </HRCard>
        </div>
        <div className="sticky bottom-0 z-10 bg-white p-6 rounded-b-xl border-t border-border flex justify-end gap-6">
          <Button
            type="button"
            variant="outline"
            className="text-[14px] font-medium leading-5 text-muted-foreground "
            onClick={() => {
              navigate({ to: '/company-setup', reloadDocument: true });
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secondary"
            className="flex gap-2  text-[14px] font-medium leading-5 text-white items-center"
            form="company-profile-form"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </ContentShell>
  );
}
