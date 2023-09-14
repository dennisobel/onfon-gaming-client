// TermsAndConditions.js
import React from 'react';
import './style.scss'; // Import the SCSS stylesheet

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-heading">EPIC GAMES TERMS AND CONDITIONS</h1>
      <p className="terms-date">AUGUST 28TH 2023</p>
      <p className="terms-company">ONFON MEDIA LIMITED</p>
      <br />
      <h2 className="terms-contents-heading">Contents</h2>
      <ol className="terms-contents-list">
        <li>GENERAL</li>
        <li>ELIGIBILITY</li>
        <li>AGE</li>
        <li>COST</li>
        <li>RESPONSIBLE USE</li>
        <li>OBLIGATIONS</li>
        <li>PRIVACY</li>
        <li>COMPLAINTS</li>
        <li>LIMITATION OF LIABILITY</li>
      </ol>

      <section className="terms-section">
        <h3 className="terms-subheading">1. GENERAL</h3>
        <p className="terms-content">
          These terms and conditions (“T & C”) apply to the usage of the games.
          The games will be offered by EPIC GAMES under ONFON MEDIA LIMITED.
          These T & C constitute a binding agreement between you and EPIC GAMES.
        </p>
        <p className="terms-content">
          Onfon Media Limited is a limited liability company incorporated in Nairobi Kenya of company registration number C 137575 and subject to Kenyan law, having its registered address at Nairobi.
        </p>
        <p className="terms-content">
          Epic Games is an entertainment platform providing web-based games for entertainment purposes only and is in the development and set-up stage where people will be able to play unlimited online games on <a href="http://epicgames.co.ke" className="terms-link">http://epicgames.co.ke</a>.
        </p>
        <p className="terms-content">
          These terms and conditions come into force as soon as you click on the “SUBSCRIBE” button, and by doing so, you signify that you have read these T&C and accept them. By subscribing you signify that you agree with these T&C.
        </p>
        <p className="terms-content">
          Epic Games reserves the right to amend these T&C. You fully understand and agree to be bound by the terms and conditions contained herein and as may be amended by us from time to time.
        </p>
      </section>

      <section className="terms-section">
        <h3 className="terms-subheading">2. Eligibility to use EPIC GAMES Services</h3>
        <p className="terms-content">
          You may have access to the entertaining games after subscribing.
        </p>
        <p className="terms-content">
          It is entirely and solely your responsibility to inquire and ensure that you do not breach laws applicable to you by participating in the games.
        </p>
        <p className="terms-content">
          You have to subscribe to the service so you can play the games for Kshs 10 per day for unlimited online games.
        </p>
      </section>

      {/* Include sections 3 to 9 similarly */}

      <section className="terms-section">
        <h3>3. Age</h3>
        <p>
          Epic Games Service is General Exhibition, (GE) therefore the games are suitable for general family playing as they do not contain content that would be considered harmful or disturbing to children. The games may be played by people of all ages.
        </p>
      </section>

      <section className="terms-section">
        <h3>4. Cost</h3>
        <p>
          The service charges Kshs 10 per day for subscribers to play unlimited online games.
        </p>
      </section>

      <section className="terms-section">
        <h3>5. Responsible Use</h3>
        <p>
          A subscriber is at their sole discretion to play the fun games of their choice.
        </p>
      </section>

      <section className="terms-section">
        <h3>6. Obligations</h3>
        <p>
          Customers have to subscribe to the service in order to play the games for Kshs 10 per day which will be deducted from their airtime.
        </p>
        <p>
          If a customer wants to unsubscribe, they dial *456*20# on Safaricom line.
          The games are html games and a customer will need internet access to play the games which will be found on http://epicgames.co.ke
        </p>
      </section>

      <section className="terms-section">
        <h3>7. Privacy</h3>
        <p>
          Any data collected shall be kept by Epic Games until required for the purpose of providing the services and in accordance with the best business practices and applicable laws.
        </p>
      </section>

      <section className="terms-section">
        <h3>8. Complaints</h3>
        <p>
          If you have a complaint, you can contact EPIC GAMES on +254703012870
          Email customer support on  epicgamessupport@onfonmedia.com
        </p>
      </section>

      <section className="terms-section">
        <h3>9. Limitation of Liability</h3>
        <p>
          Once a customer subscribes, they do so willingly. Without prejudice to the generality of the preceding provision, Epic Games, its directors, employees, partners, service providers;
          a. Do not warrant no errors
          b. Do not warrant accessibility without interruptions
          c. Shall not be liable for any loss, costs, expenses or damages whether direct or indirect, special, consequential, incidental or otherwise arising in relation to playing games.
        </p>
        <p>
          You hereby agree to fully indemnify and hold free from harm EPIC GAMES, its directors, employees, partners, and service providers for any cost, expense, loss, damages, claims and responsibilities howsoever caused that may arise from being our customer.
        </p>
      </section>

    </div>
  );
};

export default TermsAndConditions;
