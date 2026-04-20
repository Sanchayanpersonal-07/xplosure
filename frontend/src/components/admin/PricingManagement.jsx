import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, CheckCircle } from "lucide-react";
import { pricingService } from "../../services/pricingService";
import toast from "react-hot-toast";

const PricingManagement = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({
    name: "",
    price: "",
    currency: "INR",
    duration: "1 month",
    features: "",
    isPopular: false,
  });

  const fetchPlans = async () => {
    try {
      const data = await pricingService.getAllPlans();
      if (data.success) setPlans(data.plans);
    } catch (error) {
      toast.error("Failed to load plans", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...currentPlan,
      features:
        typeof currentPlan.features === "string"
          ? currentPlan.features.split(",").map((f) => f.trim())
          : currentPlan.features,
    };

    try {
      if (currentPlan._id) {
        await pricingService.updatePlan(currentPlan._id, payload);
        toast.success("Plan updated!");
      } else {
        await pricingService.createPlan(payload);
        toast.success("New plan added!");
      }
      resetForm();
      fetchPlans();
    } catch (error) {
      toast.error("Error saving plan", error);
    }
  };

  const handleEdit = (plan) => {
    setCurrentPlan({ ...plan, features: plan.features.join(", ") });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This will deactivate the plan.")) {
      try {
        await pricingService.deletePlan(id);
        toast.success("Plan deactivated");
        fetchPlans();
      } catch (error) {
        toast.error("Delete failed", error);
      }
    }
  };

  const resetForm = () => {
    setCurrentPlan({
      name: "",
      price: "",
      currency: "INR",
      duration: "1 month",
      features: "",
      isPopular: false,
    });
    setIsEditing(false);
  };

  if (loading)
    return (
      <div className="p-10 text-center text-[var(--muted)]">
        Loading plans...
      </div>
    );

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Form Section */}
      <div className="glass p-6 rounded-2xl border border-[var(--border)]">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          {isEditing ? (
            <Edit2 className="w-5 h-5 text-[var(--blue-light)]" />
          ) : (
            <Plus className="w-5 h-5 text-[var(--success)]" />
          )}
          {isEditing ? "Edit Pricing Plan" : "Add New Plan"}
        </h3>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Plan Name (e.g. Pro)"
            className="input-dark"
            required
            value={currentPlan.name}
            onChange={(e) =>
              setCurrentPlan({ ...currentPlan, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            className="input-dark"
            required
            value={currentPlan.price}
            onChange={(e) =>
              setCurrentPlan({ ...currentPlan, price: e.target.value })
            }
          />
          <select
            className="input-dark"
            value={currentPlan.currency}
            onChange={(e) =>
              setCurrentPlan({ ...currentPlan, currency: e.target.value })
            }
          >
            <option value="INR">INR (₹)</option>
            <option value="BDT">BDT (৳)</option>
            <option value="USD">USD ($)</option>
          </select>
          <input
            type="text"
            placeholder="Duration (e.g. 1 month)"
            className="input-dark"
            value={currentPlan.duration}
            onChange={(e) =>
              setCurrentPlan({ ...currentPlan, duration: e.target.value })
            }
          />
          <div className="md:col-span-2">
            <textarea
              placeholder="Features (comma separated)"
              className="input-dark h-24"
              required
              value={currentPlan.features}
              onChange={(e) =>
                setCurrentPlan({ ...currentPlan, features: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-[var(--muted)] flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentPlan.isPopular}
                onChange={(e) =>
                  setCurrentPlan({
                    ...currentPlan,
                    isPopular: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded border-[var(--border)] bg-[var(--navy-3)]"
              />
              Mark as Popular
            </label>
          </div>
          <div className="md:col-span-2 flex gap-3 mt-2">
            <button
              type="submit"
              className="btn-primary px-6 py-2 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />{" "}
              {isEditing ? "Update Plan" : "Create Plan"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="btn-ghost px-6 py-2 flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="glass overflow-hidden rounded-2xl border border-[var(--border)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--navy-3)] text-[var(--muted)] text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Plan Name</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {plans.map((plan) => (
              <tr
                key={plan._id}
                className="hover:bg-[var(--glass-hover)] transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-white flex items-center gap-2">
                    {plan.name}
                    {plan.isPopular && (
                      <span className="text-[10px] bg-[var(--blue)]/20 text-[var(--blue-light)] px-2 py-0.5 rounded-full border border-[var(--blue)]/30">
                        Popular
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-[var(--muted)]">
                  {plan.currency} {plan.price} / {plan.duration}
                </td>
                <td className="px-6 py-4">
                  {plan.isActive ? (
                    <span className="flex items-center gap-1.5 text-[var(--success)] text-sm">
                      <CheckCircle className="w-4 h-4" /> Active
                    </span>
                  ) : (
                    <span className="text-[var(--muted)] text-sm">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="p-2 hover:bg-[var(--blue)]/10 rounded-lg text-[var(--blue-light)] transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="p-2 hover:bg-[var(--error)]/10 rounded-lg text-[var(--error)] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingManagement;
