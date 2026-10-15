import React from 'react';
import { Heart, ShieldCheck, Sparkles, Truck, Sun, Droplets } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="about-us-section" id="about-us">
      <div className="about-us-container">
        {/* Section Header */}
        <div className="about-header">
          <span className="about-badge">Welcome to Our Greenhouse</span>
          <h2 className="about-title">About Paradise Nursery</h2>
          <p className="about-subtitle">
            Cultivating serene sanctuaries, one potted treasure at a time.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="about-grid">
          {/* Mission Card */}
          <div className="about-card">
            <div className="about-card-icon">
              <Sparkles size={26} />
            </div>
            <h3>Our Mission</h3>
            <p>
              At Paradise Nursery, our mission is to reconnect modern lives with the soothing
              rhythms of nature. We believe every home and workspace deserves fresh, purifying
              foliage that inspires calm, promotes mindfulness, and elevates everyday well-being.
            </p>
          </div>

          {/* Plant Collection Card */}
          <div className="about-card">
            <div className="about-card-icon">
              <Sun size={26} />
            </div>
            <h3>Curated Plant Collection</h3>
            <p>
              From lush tropical Monsteras and air-cleansing Snake Plants to vibrant outdoor
              blooms and sculptural desert succulents, each botanical specimen is hand-selected,
              carefully inspected, and nurtured to peak health before joining your sanctuary.
            </p>
          </div>

          {/* Customer Experience Card */}
          <div className="about-card">
            <div className="about-card-icon">
              <Heart size={26} />
            </div>
            <h3>Delightful Plant Care Experience</h3>
            <p>
              Whether you are a seasoned gardener or adopting your first seedling, we accompany
              your journey. Every plant arrives with custom light and watering guides, nursery-grade
              protective packaging, and access to our knowledgeable botanical support team.
            </p>
          </div>

          {/* Greener Living Card */}
          <div className="about-card">
            <div className="about-card-icon">
              <Droplets size={26} />
            </div>
            <h3>Commitment to Greener Living</h3>
            <p>
              Sustainability is our root principle. We utilize 100% biodegradable and recyclable
              shipping materials, organic peat-free potting media, and eco-friendly nursery practices
              that honor our planet and foster a cleaner, greener tomorrow.
            </p>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="about-stats-bar">
          <div className="stat-item">
            <span className="stat-number">15,000+</span>
            <span className="stat-label">Happy Plant Parents</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Healthy Arrival Guarantee</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Species & Cultivars</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">0%</span>
            <span className="stat-label">Plastic Packaging</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
