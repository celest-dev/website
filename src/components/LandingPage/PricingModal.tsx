import { useEffect } from "react";

export function openPricingModal() {
  const modal = document.getElementById("pricing-modal") as HTMLDialogElement;
  modal.showModal();
}

export function PricingModal() {
  // Close the modal when clicking outside of it, by capturing all click events
  // which do not hit the modal content.
  useEffect(() => {
    const modal = document.getElementById("pricing-modal") as HTMLDialogElement;
    modal.addEventListener("click", () => modal.close());

    const modalWrapper = document.getElementById("pricing-modal-wrapper");
    modalWrapper.addEventListener("click", (e) => e.stopPropagation());
  }, []);
  return (
    <dialog id="pricing-modal" className="modal">
      <div id="pricing-modal-wrapper">
        <h4>Celest pricing</h4>
        <p>
          The Solo tier includes 3 premium projects and unlimited free projects.
          Free projects have limited resources and cold starts, but cost you
          nothing to run.
        </p>
        <p>
          Every premium project comes with an included amount of usage. If your
          project scales beyond these limits, you pay for any additional
          resources as you go.
        </p>
        <h5>Included usage (per free project)</h5>
        <table>
          <tbody>
            <tr>
              <th>Functions</th>
              <td>50,000 invocations</td>
            </tr>
            <tr>
              <th>Auth</th>
              <td>1,000 monthly active users (MAUs)</td>
            </tr>
          </tbody>
        </table>
        <h5>Included usage (per premium project)</h5>
        <table>
          <tbody>
            <tr>
              <th>Functions</th>
              <td>500,000 invocations</td>
            </tr>
            <tr>
              <th>Auth</th>
              <td>10,000 monthly active users (MAUs)</td>
            </tr>
          </tbody>
        </table>
        <h5>Additional usage</h5>
        <table>
          <tbody>
            <tr>
              <th rowSpan={2}>Projects</th>
              <td>$0 / free project</td>
            </tr>
            <tr>
              <td>$10 / premium project</td>
            </tr>
            <tr>
              <th>Functions</th>
              <td>$1 / 10,000 invocations</td>
            </tr>
            <tr>
              <th>Auth</th>
              <td>$0.01 / MAU</td>
            </tr>
          </tbody>
        </table>
      </div>
    </dialog>
  );
}
