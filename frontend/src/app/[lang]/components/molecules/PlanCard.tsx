"use client";
import React from 'react';
import Button from '../atoms/Button';

export interface Feature {
  id: string;
  attributes: {
    name: string;
  };
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  pricePeriod: string;
  isRecommended: boolean;
  description: string;
  product_features: {
    data: Feature[];
  };
}

interface PlanCardProps {
  plan: Plan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  return (
    <div
      key={plan.id}
      className="w-full sm:w-1/2 lg:w-1/3 p-4 flex flex-col"
    >
      <div
        className={`flex flex-col p-6 space-y-6 rounded-lg text-white shadow-lg sm:p-8 w-full min-h-full transition-transform transform hover:scale-105 hover:shadow-xl ${
          plan.isRecommended
            ? "bg-gradient-to-r from-primary to-secondary"
            : "bg-primary/60"
        }`}
      >
        <div className="space-y-4">
          <h4 className="text-3xl font-bold text-center">{plan.name}</h4>
          <PriceSection
            price={plan.price}
            pricePeriod={plan.pricePeriod}
            isRecommended={plan.isRecommended}
          />
        </div>

        <p className="mt-3 leading-relaxed text-lg">{plan.description}</p>

        <FeatureList
          features={plan.product_features.data}
          isRecommended={plan.isRecommended}
        />

        <Button
          type={plan.isRecommended ? "bordered-light" : "primary"}
          text="Get Started"
          onClick={() => alert(`Getting started with ${plan.name}`)}
        />
      </div>
    </div>
  );
};

export default PlanCard;

interface PriceSectionProps {
  price: string;
  pricePeriod: string;
  isRecommended: boolean;
}

const PriceSection: React.FC<PriceSectionProps> = ({ price, pricePeriod, isRecommended }) => {
  return (
    <div className="space-y-2">
      <span className="text-6xl font-bold">
        {price}
        <span className={`ml-1 text-sm tracking-wider`}>
          {pricePeriod.toLowerCase()}
        </span>
      </span>
    </div>
  );
};

interface FeatureListProps {
  features: Feature[];
  isRecommended: boolean;
}

const FeatureList: React.FC<FeatureListProps> = ({ features, isRecommended }) => {
  return (
    <ul className="flex-1 mb-6">
      {features.map((feature) => (
        <li key={feature.id} className="flex mb-2 space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="flex-shrink-0 w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>{feature.attributes.name}</span>
        </li>
      ))}
    </ul>
  );
};
