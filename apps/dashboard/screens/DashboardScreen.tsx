import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { tokens } from "../../theme/tokens";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { Button } from "../components/ui/Button";

// 💡 Ici, on importera ton vrai hook Orval, par exemple :
// import { useGetRestaurants } from "@odyssey/api-client";

export function DashboardScreen() {
  // Simulation de l'état du hook React Query d'Orval
  // const { data, isLoading, error, refetch } = useGetRestaurants();
  const isLoading = false;
  const error = null;
  const data = [
    { id: 1, name: "Le Bistrot Odyssey", status: "Ouvert", ordersCount: 12 },
    { id: 2, name: "Chez Drizzle & Hono", status: "Fermé", ordersCount: 0 },
  ];

  // 1. État de chargement (Loading) -> On utilise nos Skeletons !
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chargement du Dashboard...</Text>
        <View style={styles.list}>
          <Card>
            <Skeleton height={60} />
          </Card>
          <Card>
            <Skeleton height={60} />
          </Card>
          <Card>
            <Skeleton height={60} />
          </Card>
        </View>
      </View>
    );
  }

  // 2. État d'erreur -> Gestion sémantique propre
  if (error) {
    return (
      <View style={styles.container}>
        <Card style={styles.errorCard}>
          <Text style={styles.errorText}>
            Impossible de charger les données.
          </Text>
          <Button title="Réessayer" variant="danger" onPress={() => {}} />
        </Card>
      </View>
    );
  }

  // 3. État nominal (Data chargé)
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tableau de bord Restaurant 📊</Text>
      <Text style={styles.subtitle}>Gestion opérationnelle en temps réel.</Text>

      <View style={styles.list}>
        {data?.map((restaurant) => (
          <Card key={restaurant.id} variant="default" style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <View
                style={[
                  styles.badge,
                  restaurant.status === "Ouvert"
                    ? styles.badgeSuccess
                    : styles.badgeMuted,
                ]}
              >
                <Text style={styles.badgeText}>{restaurant.status}</Text>
              </View>
            </View>

            <Text style={styles.cardBody}>
              Commandes en cours :{" "}
              <Text style={{ fontWeight: "600" }}>
                {restaurant.ordersCount}
              </Text>
            </Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.neutral.background,
    padding: tokens.spacing.lg,
  },
  title: {
    fontSize: tokens.typography.sizes.xl,
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.brand.primary,
  },
  subtitle: {
    fontSize: tokens.typography.sizes.sm,
    color: tokens.colors.neutral.textSecondary,
    marginBottom: tokens.spacing.lg,
  },
  list: {
    gap: tokens.spacing.md,
    maxWidth: 800,
  },
  card: {
    gap: tokens.spacing.xs,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantName: {
    fontSize: tokens.typography.sizes.md,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.brand.primary,
  },
  cardBody: {
    fontSize: tokens.typography.sizes.sm,
    color: tokens.colors.neutral.textSecondary,
  },
  badge: {
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.radii.full,
  },
  badgeSuccess: {
    backgroundColor: tokens.colors.semantic.successBg || "#D1FAE5",
  },
  badgeMuted: {
    backgroundColor: tokens.colors.neutral.border,
  },
  badgeText: {
    fontSize: tokens.typography.sizes.xs,
    fontWeight: tokens.typography.weights.medium,
    color: tokens.colors.brand.primary,
  },
  errorCard: {
    borderColor: tokens.colors.semantic.error,
    alignItems: "center",
    gap: tokens.spacing.md,
  },
  errorText: {
    color: tokens.colors.semantic.error,
    fontWeight: "500",
  },
});
