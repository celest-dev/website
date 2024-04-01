import Link from "@docusaurus/Link";
import {
  FaBuilding,
  FaInfoCircle,
  FaRocket,
  FaUserAstronaut,
} from "react-icons/fa";
import { openPricingModal, PricingModal } from "./PricingModal";
import useBrokenLinks from "@docusaurus/useBrokenLinks";

export function PricingTable() {
  // Needed for docusaurus anchor detection for some reason
  // https://github.com/facebook/docusaurus/issues/9721#issuecomment-1882898840
  useBrokenLinks().collectAnchor("pricing");
  return (
    <section id="pricing" className="pricing celest-categories-client">
      <h2 className="middle-header categories-bottom-header-margin">Pricing</h2>
      <div className="categories">
        {/* Always Free */}
        <div className="pricing-tier">
          <div className="pricing-card-header">
            <FaRocket className="category-icon-client" />
            <h3 className="category-title">Always Free</h3>
          </div>
          <div className="category-description">
            <p>No credit card required. Always free.</p>
          </div>
          <ul className="pricing-features">
            <li className="pro">
              5,000 function invocations
              <span className="per-project"> / project</span>
            </li>
            <li className="pro">
              100 monthly active users
              <span className="per-project"> / project</span>
            </li>
            <li className="pro">3 free projects</li>
            <li className="con">Cold starts</li>
          </ul>
          <div className="pricing-cta">
            <div className="pricing-price">
              <span>Free</span>
            </div>
            <p className="pricing-action">
              To get started, run: <code>celest deploy</code>
            </p>
          </div>
        </div>

        {/* Solo */}
        <div className="pricing-tier">
          <div className="pricing-card-header">
            <FaUserAstronaut className="category-icon-client" />
            <h3 className="category-title">Solo</h3>
          </div>
          <div className="category-description">
            <p>Perfect for solo developers who need power.</p>
          </div>
          <ul className="pricing-features">
            <li className="pro">
              50,000 function invocations
              <span className="per-project"> / project</span>
            </li>
            <li className="pro">
              1,000 monthly active users
              <span className="per-project"> / project</span>
            </li>
            <li className="pro">3 premium projects</li>
            <li className="pro">Unlimited free projects</li>
          </ul>
          <div className="pricing-cta">
            <div className="pricing-price">
              <span>$20 / month</span>
              <button
                className="pricing-price-subtext pricing-modal-button"
                onClick={openPricingModal}
              >
                <span>plus usage</span>
                <FaInfoCircle className="info-icon" />
              </button>
            </div>
            <PricingModal />
            <p className="pricing-action">
              To sign up, run: <code>celest subscribe</code>
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="pricing-tier">
          <div className="pricing-card-header">
            <FaBuilding className="category-icon-client" />
            <h3 className="category-title">Team</h3>
          </div>
          <div className="category-description">
            <p>Manage organizations and invite your team to collaborate.</p>
          </div>
          <ul className="pricing-features">
            <li className="pro">Multiple team members</li>
            <li className="pro">Role-based access controls</li>
            <li className="pro">Auto-scaling</li>
            <li className="pro">Priority support</li>
          </ul>
          <div className="pricing-cta">
            <div className="pricing-price">
              <span>Contact Us</span>
            </div>
            <button
              data-cal-link="celest-dev/meet-website"
              data-cal-config='{"layout":"month_view"}'
              className="pricing-cta-button pricing-action"
            >
              Schedule a call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
