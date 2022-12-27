import Emails from './Emails';
/**
 * @param {Object} props
 * @return {void}
 */
export default function Dashboard(props) {
  return (
    <div>
      {props.values.mailbox}
      <Emails />
    </div>
  );
}
