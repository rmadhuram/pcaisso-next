import './page.scss';
import Link from 'next/link';
import { Splitter, SplitterPanel } from "primereact/splitter";

export default function Home () {
  return (
        <Splitter className="display">
          <SplitterPanel className="animate animated bounceInUp display credits">
          <h2>Founding Team</h2>
            <h3>Project Lead</h3>
            <ul>
              <li><a href="https://www.linkedin.com/in/rmadhuram/">Raj Madhuram</a> (CSE '95)</li>
            </ul>

            <h3>Contributors</h3>
            <h4>(In the order of contributions)</h4>
            <ul>
              <li><a href="https://www.linkedin.com/in/varshinianandhanehru/">Varshini Anandha Nehru</a> (Spouse of Mech '14)</li>
              <li><a href="https://www.linkedin.com/in/jeremy-asirwaad-182b93192/">Jeremy Asirwaad</a> (IT '24)</li>
              <li><a href="https://www.linkedin.com/in/iamnoufal/">Noufal Rahman</a> (CSE '24)</li>
              <li><a href="https://www.linkedin.com/in/suntrakanesh-subramanian-0a81471a4/">Suntrakanesh Subramanian</a> (EIE '23)</li>
              <li><a target="_blank" href="https://www.linkedin.com/in/aleena-joseph-918072258/">Aleena Joseph</a> (CSE '26)</li>
            </ul>
          </SplitterPanel>
        </Splitter>     
  );
}