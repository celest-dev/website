import Link from "@docusaurus/Link";
import { FaBuilding, FaInfoCircle, FaRocket, FaUserAstronaut } from "react-icons/fa";
import { openPricingModal, PricingModal } from "./PricingModal";

export function PricingTable() {
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
            <li className="pro">2 free projects</li>
            <li className="pro">5,000 function invocations</li>
            <li className="pro">1,000 monthly active users</li>
            <li className="con">Cold starts</li>
            <li className="con">Limited resources</li>
          </ul>
          <div className="pricing-cta">
            <p className="pricing-price">Free</p>
            <button className="pricing-cta-button">
              <Link to="/docs/overview">Get started</Link>
            </button>
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
            <li className="pro">3 premium projects</li>
            <li className="pro">Unlimited free projects</li>
            <li className="pro">5,000 function invocations</li>
            <li className="pro">100 monthly active users</li>
          </ul>
          <div className="pricing-cta">
            <p className="pricing-price">$20 / month</p>
            <button
              className="pricing-price-subtext pricing-modal-button"
              onClick={openPricingModal}
            >
              <span>plus usage</span>
              <FaInfoCircle className="info-icon" />
            </button>
            <PricingModal />
            <button className="pricing-cta-button">
              <Link to="https://join.celest.dev/b/test_9AQeW6b97cOT4E09AA">
                Sign up
              </Link>
            </button>
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
            <p className="pricing-price">Contact Us</p>
            <button
              data-cal-link="celest-dev/meet-website"
              data-cal-config='{"layout":"month_view"}'
              className="pricing-cta-button"
            >
              Schedule a call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
