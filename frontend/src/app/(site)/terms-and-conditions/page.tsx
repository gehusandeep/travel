import { createLegalPage } from '@/components/content/legal-page';
import { termsAndConditions } from '@/content/legal';
import { routes } from '@/lib/routes';

const legalPage = createLegalPage(termsAndConditions, routes.terms);

export const metadata = legalPage.metadata;
export default legalPage.Page;
