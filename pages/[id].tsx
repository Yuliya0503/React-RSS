import { getPeople, getPerson } from '@/src/API/CardService';
import { wrapper } from '@/src/Store/Store';
import Details from '@/src/components/Details/Details';
import Header from '@/src/components/Header/Header';
import PeopleSection from '@/src/components/PeopleSection/PeopleSection';
import { IPeople, IResponse } from '@/src/models/ISWAPI';
import { encode } from 'querystring';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const queryParams = new URLSearchParams(encode(context.query));
      await store.dispatch(getPeople.initiate(queryParams.toString()));
      const id = context.params?.id;
      if (typeof id === 'string') {
        store.dispatch(getPerson.initiate(id));
      }
      const [people, person] = await Promise.all([
        store.dispatch(getPeople.initiate(queryParams.toString())),
        id && store.dispatch(getPerson.initiate(id as string)),
      ]);
      const { data: peopleData } = people || {};
      const { data: personData } = person || {};
      return {
        props: {
          people: peopleData || null,
          person: personData || null,
        },
      };
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      return {
        props: {
          people: null,
          person: null,
        },
      };
    }
  }
);

interface Props {
  person: IPeople;
  people: IResponse;
}
const DetailsPage = ({ person, people }: Props): JSX.Element => (
  <>
    <Header />
    <PeopleSection people={people}>
      <Details person={person} />
    </PeopleSection>
  </>
);

export default DetailsPage;
